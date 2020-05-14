package db;

import com.mongodb.MongoClient;

public class DatabaseConnection {

    private static volatile MongoClient ourInstance = null;

    // singleton with lazy loading
    public static synchronized MongoClient getInstance() {
        if (ourInstance == null) {
            ourInstance = new MongoClient("localhost", 27017);
        }
        return ourInstance;
    }

    private DatabaseConnection() {
    }
}
