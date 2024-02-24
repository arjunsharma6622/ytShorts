import './App.css';
import ShortVideo from './components/ShortVideo';

function App() {
  const videos = [
    { id : 1, url : 'https://player.vimeo.com/external/491096474.sd.mp4?s=f3c89b06d24f7241fd973174c9e59d6fbdc782ee&profile_id=165&oauth2_token_id=57447761'},
    { id : 2, url : 'https://player.vimeo.com/external/530150561.sd.mp4?s=7208a556f10e7d413a954253b95bc5b97da2f8b5&profile_id=165&oauth2_token_id=57447761'},
    { id : 3, url : 'https://player.vimeo.com/external/467819715.sd.mp4?s=a26407997e8fee5bf0bd73c4ebc95938f2be1fdf&profile_id=165&oauth2_token_id=57447761'},
    { id : 4, url : 'https://player.vimeo.com/external/491096474.sd.mp4?s=f3c89b06d24f7241fd973174c9e59d6fbdc782ee&profile_id=165&oauth2_token_id=57447761'},
    { id : 5, url : 'https://player.vimeo.com/external/479728625.sd.mp4?s=f4f886d3d45a0312d8d47419647788178535a2c6&profile_id=165&oauth2_token_id=57447761'},
    { id : 6, url : 'https://player.vimeo.com/external/447445828.sd.mp4?s=aed6125828c582c98ab0267b8330389acc9e46b4&profile_id=165&oauth2_token_id=57447761'},
  ]
  return (
    <div className="App">
      <div className='short-videos-wrapper'>
     {
      videos.map((video) => (
        <ShortVideo key={video.id} url={video.url}/>
      ))
     }
     </div>
    </div>
  );
}

export default App;
