from mysql.connector import connect
from mysql.connector import Error
from mysql.connector import pooling
import json
import os

class mydb_mgr:
    def __init__(self):
        self._mypool = None

    def reset(self):
        self.connect()
        self.reset_database()
        self.reset_table()

    def init(self):
        self.connect()

    def connect(self):
        self._mypool = pooling.MySQLConnectionPool(
            pool_name="my_py_pool",
            pool_size=3,
            pool_reset_session=True,
            host=os.getenv("MYSQL_HOST","localhost"),
            user=os.getenv("MYSQL_USER","root"),
            password=os.getenv("MYSQL_ROOT_PASSWD","root")
        )
        print("Connection Pool Name - ", self._mypool.pool_name)
        print("Connection Pool Size - ", self._mypool.pool_size)

    def connect_and_run(self, func, is_commit=False):
        if self._mypool==None:
            return
        result = None
        try:
            mydb = self._mypool.get_connection()
            if mydb.is_connected():
                mycursor = mydb.cursor()
                result = func(mycursor)

                if is_commit:
                    mydb.commit()

        except Error as e:
            print("Error while connecting to MySQL using Connection pool : ", e)
        finally:
            if mydb.is_connected():
                mycursor.close()
                mydb.close()
            return result

    def reset_database(self):
        def run(cursor):
            cursor.execute("DROP DATABASE IF EXISTS website")
            cursor.execute("CREATE DATABASE website")
        self.connect_and_run(run)

    def reset_table(self):
        def run(cursor):
            cursor.execute("USE website")
            cursor.execute("DROP TABLE IF EXISTS message")
            cursor.execute("DROP TABLE IF EXISTS member")
            cursor.execute( \
                "CREATE TABLE member( \
                    id bigint AUTO_INCREMENT, \
                    name varchar(255) NOT NULL, \
                    username varchar(255) NOT NULL, \
                    password varchar(255) NOT NULL, \
                    follower_count int UNSIGNED NOT NULL DEFAULT 0, \
                    time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \
                    PRIMARY KEY(id) \
                )" \
            )
            cursor.execute( \
                "CREATE TABLE message( \
                    id bigint AUTO_INCREMENT, \
                    member_id bigint NOT NULL, \
                    content varchar(255) NOT NULL, \
                    like_count int UNSIGNED NOT NULL DEFAULT 0, \
                    time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \
                    PRIMARY KEY(id), \
                    FOREIGN KEY(member_id) REFERENCES member(id) \
                )" \
            )
        self.connect_and_run(run)
    
    def show(self):
        def run(cursor):
            cursor.execute("USE website")
            cursor.execute("SELECT * FROM member")
            member_info = cursor.fetchall()
            for x in member_info: print(x)
            cursor.execute("SELECT * FROM message")
            message_info = cursor.fetchall()
            for x in message_info: print(x)
        self.connect_and_run(run)

    def get_member(self, username, password=None):
        def run(cursor):
            if password==None:
                sql = "SELECT id, username, name FROM member WHERE username = %s"
                val = (username, )
            else:
                sql = "SELECT id, username, name FROM member WHERE username = %s AND password = %s"
                val = (username, password)
            cursor.execute("USE website")
            cursor.execute(sql, val)
            return cursor.fetchall()
        return self.connect_and_run(run)
    
    def update_member(self, username, name):
        def run(cursor):
            sql = "UPDATE member SET name=%s WHERE username=%s"
            val = (name, username)
            cursor.execute("USE website")
            cursor.execute(sql, val)
            cursor.execute("SELECT CASE WHEN ROW_COUNT() > 0 THEN 1 ELSE 0 END AS updated")
            return cursor.fetchall()
        return self.connect_and_run(run, True)

    def add_member(self, name, username, password, follower_count=0):
        def run(cursor):
            sql = "INSERT INTO member (name, username, password, follower_count) VALUES (%s, %s, %s, %s)"
            val = (name, username, password, follower_count)
            cursor.execute("USE website")
            cursor.execute(sql, val)
        self.connect_and_run(run, True)

    def get_message(self):
        def run(cursor):
            cursor.execute("USE website")
            cursor.execute("SELECT message.id, message.content, member.username FROM member INNER JOIN message ON message.member_id=member.id ORDER BY message.time DESC")
            message_info = cursor.fetchall()
            return message_info
        return self.connect_and_run(run)

    def add_message(self, member_id, content, like_count=0):
        def run(cursor):
            # sql = "INSERT INTO message (member_id, content, like_count) SELECT id, %s, %s FROM member WHERE id=%s LIMIT 1"
            sql = "INSERT INTO message (member_id, content, like_count) VALUES (%s, %s, %s)"
            val = (member_id, content, like_count)
            cursor.execute("USE website")
            cursor.execute(sql, val)
        self.connect_and_run(run, True)

    def delete_message(self, msg_id, user_id):
        def run(cursor):
            sql = "DELETE FROM message WHERE id=%s"
            val = (msg_id,)
            print(sql)
            cursor.execute("USE website")
            cursor.execute(sql, val)
        self.connect_and_run(run, True)


if __name__=="__main__":
    flow = mydb_mgr()
    reset = input("Do you want to reset : ")
    if reset=="yes":
        flow.reset()
    else:
        flow.init()

    flow.show()