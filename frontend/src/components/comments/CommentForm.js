import React from "react";

function CommentForm({onSubmit}) {
    const [body, setBody] = React.useState("");

    const handleSubmit = () => {
        // Invoke the passed in event callback
        onSubmit({body: body});

        // Clear the input field
        setBody("");
    };

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title" >Write a comment...</h5>
                <div>
                    <div className="form-group">
                        <textarea 
                            className="form-control"
                            placeholder="Write something..."
                            value={body}
                            onChange={e => setBody(e.target.value)} />
                    </div>


                    <div className="form-group">
                        <button 
                            className="btn btn-primary" 
                            onClick={handleSubmit}>
                            Comment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommentForm;