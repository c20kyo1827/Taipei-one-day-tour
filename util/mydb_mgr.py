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
            cursor.execute("DROP TABLE IF EXISTS attraction")
            cursor.execute("DROP TABLE IF EXISTS mrt")
            cursor.execute("DROP TABLE IF EXISTS category")
            cursor.execute("DROP TABLE IF EXISTS image")
            cursor.execute( \
                "CREATE TABLE attraction( \
                    id bigint AUTO_INCREMENT, \
                    name varchar(255) NOT NULL, \
                    description TEXT NOT NULL, \
                    address TEXT NOT NULL, \
                    lng FLOAT NOT NULL, \
                    lat FLOAT NOT NULL, \
                    PRIMARY KEY(id) \
                )" \
            )
            cursor.execute( \
                "CREATE TABLE mrt( \
                    id bigint AUTO_INCREMENT, \
                    name varchar(255) NOT NULL, \
                    attraction_id bigint NOT NULL, \
                    FOREIGN KEY(attraction_id) REFERENCES attraction(id), \
                    PRIMARY KEY(id) \
                )" \
            )
            cursor.execute( \
                "CREATE TABLE category( \
                    id bigint AUTO_INCREMENT, \
                    name varchar(255) NOT NULL, \
                    attraction_id bigint NOT NULL, \
                    FOREIGN KEY(attraction_id) REFERENCES attraction(id), \
                    PRIMARY KEY(id) \
                )" \
            )
            cursor.execute( \
                "CREATE TABLE image( \
                    id bigint AUTO_INCREMENT, \
                    url TEXT NOT NULL, \
                    attraction_id bigint NOT NULL, \
                    FOREIGN KEY(attraction_id) REFERENCES attraction(id), \
                    PRIMARY KEY(id) \
                )" \
            )
        self.connect_and_run(run)
    
    def show(self):
        def run(cursor):
            cursor.execute("USE website")
            table = ["attraction", "mrt", "category", "image"]
            for t in table:
                cmd = "SELECT * FROM " + t
                cursor.execute(cmd)
                member_info = cursor.fetchall()
                for x in member_info: print(x)
        self.connect_and_run(run)

if __name__=="__main__":
    flow = mydb_mgr()
    reset = input("Do you want to reset : ")
    if reset=="yes":
        flow.reset()
    else:
        flow.init()

    print("Show the content : ")
    flow.show()