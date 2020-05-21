import React from "react";
import SearchBar from "./SearchBar";
import youtube from "../apis/youtube";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";

class App extends React.Component {
  state = { videos: [], selectedVideo: null, KEY: "AIzaSyBXAyimeyDQaq0xckMpjEG4NzYGJR_XTbg" };
//   KEY = "AIzaSyBXAyimeyDQaq0xckMpjEG4NzYGJR_XTbg";

  // make some default search
  componentDidMount() {
    this.onTermSubmit("explosions in the sky");
  }

  onTermSubmit = async (term) => {
    const response = await youtube.get("/search", {
      params: {
        q: term,
        part: "snippet",
        type: "video",
        maxResulrs: 5,
        // key: "AIzaSyCH6EW8c5zrMEGlyz9j_-H2WwCqiW5SrU4",
        key: this.state.KEY
      },
    });

    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0], // use as default video
    });
    // console.log(response);
  };

  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
    // console.log("From the App!", video);
  };

  render() {
    return (
      <div className="ui container">
        <SearchBar onFormSubmit={this.onTermSubmit} />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideoDetail video={this.state.selectedVideo} />
            </div>

            <div className="five wide column">
              <VideoList
                onVideoSelect={this.onVideoSelect}
                videos={this.state.videos}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
