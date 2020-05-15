
package demo;

import static spark.Spark.*;

import com.google.gson.Gson;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import dao.NotesDao;
import db.DatabaseConnection;
import org.bson.Document;
import java.util.*;

import java.util.ArrayList;
import java.util.List;

public class ChatRoomServer {
  public static void main(String[] args) {
    port(1235);
    // open connection
    MongoClient mongoClient = DatabaseConnection.getInstance();

    MongoDatabase db = mongoClient.getDatabase("MyDatabase_0511");
    MongoCollection<Document> userCollection = db.getCollection("Users");

    // Gson
    Gson gson = new Gson();

    webSocket("/chat", WebSocketHandler.class);

    post("/api/authenticate", (req, res) -> {
      String bodyString = req.body();
      AuthDto authDto = gson.fromJson(bodyString, AuthDto.class);

      // Compare data in the mongodb, it is possible existing two same data
      List<Document> potentialUser = userCollection.find(new Document("username", authDto.username))
              .into(new ArrayList<>());

      if(potentialUser.size() != 1){
        AuthResponseDto responseDto =
                new AuthResponseDto(false, "User not found");
        return gson.toJson(responseDto);
      }

      Document userDocument = potentialUser.get(0);
      if(!userDocument.getString("password").equals(authDto.password)){
        AuthResponseDto responseDto =
                new AuthResponseDto(false, "Password is incorrect");
        return gson.toJson(responseDto);
      }

      AuthResponseDto responseDto =
              new AuthResponseDto(true, null);
      return gson.toJson(responseDto);
    });


    post("/api/register", (req, res) -> {
        String bodyString = req.body();
        AuthDto authDto = gson.fromJson(bodyString, AuthDto.class);

      List<Document> potentialUser = userCollection.find(new Document("username", authDto.username))
              .into(new ArrayList<>());
      if(!potentialUser.isEmpty()) {
        AuthResponseDto authResponseDto =
                new AuthResponseDto(false, "User already exist");
        return gson.toJson(authResponseDto);
      }

      Document newUser = new Document()
              .append("username", authDto.username)
              .append("password", authDto.password);
      userCollection.insertOne(newUser);
      AuthResponseDto authResponseDto =
              new AuthResponseDto(true, null);
      return gson.toJson(authResponseDto);
    });


    post("/api/addNote", (req, res) -> {
      String bodyString =  req.body();
      System.out.println("add notes: req body: " + req.body());
      AddNoteDto noteDto = gson.fromJson(bodyString, AddNoteDto.class);

      NotesDao notesDao = NotesDao.getInstance();
      notesDao.addNote(noteDto.username, noteDto.note);
      return "OK";
    });

    get("/api/getAllNotes", (req, res) -> {
      NotesDao notesDao = NotesDao.getInstance();
      NotesListDto list = notesDao.getAllNotes();
      return gson.toJson(list);
    });

    post("/api/like", (req, res) -> {
      String bodyString =  req.body();
      System.out.println("add like: req body: " + req.body());
      AddLikeDto likeDto = gson.fromJson(bodyString, AddLikeDto.class);

      NotesDao notesDao = NotesDao.getInstance();
      notesDao.addLike(likeDto.username, likeDto.postId);
      return "OK";
    });

    post("/api/unlike", (req, res) -> {
      String bodyString =  req.body();
      System.out.println("unlike: req body: " + req.body());
      AddLikeDto likeDto = gson.fromJson(bodyString, AddLikeDto.class);

      NotesDao notesDao = NotesDao.getInstance();
      notesDao.unlike(likeDto.username, likeDto.postId);
      return "OK";
    });
    }
}
