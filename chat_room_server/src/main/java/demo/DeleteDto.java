package demo;

public class DeleteDto {
    public final String username;
    public final int postId;

    public DeleteDto(String username, int postId) {
        this.postId = postId;
        this.username = username;
    }
}
