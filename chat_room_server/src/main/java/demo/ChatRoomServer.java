package demo;

import static spark.Spark.*;

import com.google.gson.Gson;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import dao.NotesDao;
import org.bson.Document;
import java.util.*;

import java.util.ArrayList;
import java.util.List;

public class ChatRoomServer {
  public static void main(String[] args) {

    MongoClient mongoClient = new MongoClient("localhost", 27017);
    MongoDatabase db = mongoClient.getDatabase("MyDatabase_0504");
    MongoCollection<Document> userCollection = db.getCollection("Users");

    // Gson
    Gson gson = new Gson();
    port(1235);

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

    }
}