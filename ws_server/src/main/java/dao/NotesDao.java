package dao;

import com.mongodb.BasicDBList;
import com.mongodb.client.model.Updates;
import demo.MessageDto;
import demo.NotesListDto;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.UpdateOptions;
import com.mongodb.client.result.*;
import static com.mongodb.client.model.Filters.*;
import static com.mongodb.client.model.Updates.*;

import org.bson.Document;

import java.util.ArrayList;
import java.util.Random;
import java.util.List;
import java.util.stream.Collectors;


public class NotesDao {
    // step1
    private static NotesDao instance;

    private NotesDao() {
    }

    public void addNote(String name, String note) {
        // connect data
        Random rand = new Random();
        int postId = rand.nextInt(1000000);
        MongoDatabase db = DatabaseConnection
                .mongoClient.getDatabase("MyDatabase_0504");
        MongoCollection<Document> notesCollection = db.getCollection("Notes");

//        Document newNote = new Document("note", note);
//        notesCollection.insertOne(newNote);
        List<String> likesList = new ArrayList<String>();
        Document newNote = new Document()
                .append("postId", postId)
                .append("username", name)
                .append("note", note)
                .append("likes", likesList);
        notesCollection.insertOne(newNote);
    }

    public void addLike(String name, int postId) {
        // connect data
        MongoDatabase db = DatabaseConnection
                .mongoClient.getDatabase("MyDatabase_0504");
        MongoCollection<Document> notesCollection = db.getCollection("Notes");

        // Find message if Id: post and append username to likes
        System.out.println("will add " + name + "'s like to post " + postId);
        notesCollection.updateOne(eq("postId", postId), Updates.addToSet("likes", name));

//        Document newNote = new Document("note", note);
//        notesCollection.insertOne(newNote);
/*
        Document newNote = new Document()
                .append("username", name)
                .append("note", note);
        notesCollection.insertOne(newNote);

 */
    }

    public NotesListDto getAllNotes() {
        MongoDatabase db = DatabaseConnection
                .mongoClient.getDatabase("MyDatabase_0504");
        MongoCollection<Document> notesCollection = db.getCollection("Notes");
        List<MessageDto> notes = notesCollection.find().into(new ArrayList<>())
//                .stream()
//                .map(document -> {
//                    return document.getString("note");
//                })
//                .collect(Collectors.toList());
//        return new NotesListDto(notes);


                .stream()
                .map(document -> {
//                    System.out.println("document: "+ document);
//                    System.out.println("document-user: "+ document.getString("username"));
//                    System.out.println("document-note: "+ document.getString("note"));
                    //BasicDBList likesDBList = (BasicDBList) document.get("likes");

                    List<String> likesList = (List<String>) document.get("likes");
                    return new MessageDto(document.getInteger("postId"), document.getString("username"), document.getString("note"), likesList);
                })
                .collect(Collectors.toList());

        //System.out.println("Notes list:" + notes);

        return new NotesListDto(notes);
    }


    // Step1: singleton
    public static NotesDao getInstance() {
        if (instance == null) {
            instance = new NotesDao();
        }
        return instance;
    }
}
