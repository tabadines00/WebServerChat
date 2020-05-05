package demo;

public class AddNoteDto {
    public final String note;
    public final String username;

    public AddNoteDto(String note, String username) {
        this.note = note;
        this.username = username;
    }
}
