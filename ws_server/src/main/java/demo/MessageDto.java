package demo;

import java.util.List;

public class MessageDto {
    public final int postId;
    public final String username;
    public final String message;
    public final List<String> likes;

    public MessageDto(int postId, String username, String message, List<String> likes) {
        this.postId = postId;
        this.username = username;
        this.message = message;
        this.likes = likes;
    }
}
