// import React from "react"

// export default function Meme() {
//     return (
//         <main>
//             <form className="form">
//                 <div>
//                     <label htmlFor="top-text">Top Text</label>
//                     <input
//                         id="top-text"
//                         type="text"
//                         placeholder="Shut up"
//                         className="form--input"
//                     />
//                 </div>
//                 <div>
//                     <label>Bottom Text
//                     <input
//                             type="text"
//                             placeholder="and take my money"
//                             className="form--input"
//                         />
//                     </label>
//                 </div>
//                 <button
//                     className="form--button"
//                 >
//                     Get a new meme image 🖼
//                 </button>
//             </form>
//         </main>
//     )
// }
import React from "react"
import { toPng } from "html-to-image"
import download from "downloadjs"
import Draggable from 'react-draggable';

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })
    const [allMemes, setAllMemes] = React.useState([])

    
    React.useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes()
    }, [])
    
    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }
    
    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    //Downloading Meme
    const node = document.getElementById('memeWrapper')

    function imageDownload(){
        toPng(node)
        .then(dataurl=>{
            download(dataurl,"custom-meme.png")
        })
        .catch(()=>console.log("error"))
    }


    
    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 
                </button>
            </div>
            <div className="meme" id="memeWrapper">
               
                <img src={meme.randomImage} className="meme--image" />
               <Draggable>
                <h2 className="meme--text top">{meme.topText}</h2>
                </Draggable>
                <Draggable>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
                 </Draggable>
            </div>
            <button className="dwnld" onClick={imageDownload}>Download Meme</button>
        </main>
    )
}