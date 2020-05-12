package demo;

public class AddLikeDto {
    public final String username;
    public final int postId;

    public AddLikeDto(String username, int postId) {
        this.postId = postId;
        this.username = username;
    }
}
