import React, {useRef, useState} from 'react'

export default function Textform(props) {
    const [text, setText] = useState("");
    const textarea = useRef(null);

    const convertUp = () => {
        
        if(text !== ""){
            let newText = text.toUpperCase();
            setText(newText);
            props.showAlert("Converted Uppercase.","info");
        }
        else{
            props.showAlert("Please Type some words first.","danger");
        }
    }

    const convertLow = () => {
        
        if(text !== ""){
            let newText = text.toLowerCase();
            setText(newText);
            props.showAlert("Converted Lowercase.","info");
        }
        else{
            props.showAlert("Please Type some words first.","danger");
        }
    }

    const clearText = () => {
        
        if(text !== ""){
            setText('');
            props.showAlert("All Text cleared.","warning");
        }
        else{
            props.showAlert("Please Type some words first.","danger");
        }
    }

    const copyText = () => {
        
        if(text !== ""){
            textarea.current.select();
            document.execCommand('copy');
            document.getSelection().removeAllRanges();
            props.showAlert("Text Copied.","info");
        }
        else{
            props.showAlert("Please Type some words first.","danger");
        }
    }

    const removeExtra = () => {
        
        if(text !== ""){
            let trimmedText = text.trim().split(/ +/).join(' ');
            setText(trimmedText);
            props.showAlert("Removed Extra Spaces.","warning");
        }
        else{
            props.showAlert("Please Type some words first.","danger");
        }
    }

    const handleChange = (event) => {
        setText(event.target.value);
    }

    const readTxt = (event) => {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onload = function(event){
            setText(event.target.result);
        };
        reader.readAsText(file);
        props.showAlert("Text file uploaded.","info");
    }

    return (
        <>
            <div className="container" style={{color: props.mode==='dark'?'white':'#282828'}}>
                <h1>{props.heading}</h1>
                <div className="mb-3">
                    <label htmlFor="myBox"></label>
                    <textarea className="form-control" id="myBox" rows="10" onChange = {handleChange} value = {text} placeholder="Enter Text here"
                     style={{backgroundColor: props.mode==='dark'?'rgb(68 64 64)':'white',color: props.mode==='dark'?'white':'#282828'}}
                     ref = {textarea}>
                    
                    </textarea>
                </div>
                <button className="btn btn-primary" onClick={convertUp}>Convert to UpperCase</button>
                <button className="btn btn-primary mx-1 my-1" onClick={convertLow}>Convert to LowerCase</button>
                
                <button className="btn btn-primary" onClick={copyText}>Copy Text</button>
                <button className="btn btn-primary mx-1 my-1" onClick={removeExtra}>Remove Extra Spaces</button>
                <button className="btn btn-warning" onClick={clearText}>Clear Text</button>
                <hr />
                <input type="file" className="btn btn-secondary my-3" accept="text/plain" onChange = {readTxt}/>
            </div>

            <div className="container my-3 text-center" style={{color: props.mode==='dark'?'white':'#282828'}}>
                <h3>Your Text Summary</h3>
                <p>Words - {text.split(" ").filter((ele) => {return ele.length !== 0}).length}</p>
                <p>Characters - {text.length}</p>
                <p>Minutes to read - {0.008 * text.split(" ").filter((ele) => {return ele.length !== 0}).length}</p>
                <p>Number of Sentences - {text.split(".").length - 1}</p>
                <h4 className="my-3">Preview</h4>
                <p>{text}</p>
            </div>
            
        </>
    )
}
