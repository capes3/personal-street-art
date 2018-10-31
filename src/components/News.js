import React, {Component} from 'react';// import React
import axios from 'axios';



class News extends Component {
    constructor(props){
        super(props)
            this.state= {
                articles: []
            };
    }


componentWillMount(){
    this.getArticles(this.props.default)
}

// componentWillReceiveProps(nextProps) {
//     if (nextProps !== this.props) {
//         this.setState({
//             url: `https://newsapi.org/v2/articles?source=${nextProps.default}&apiKey=fc7cb33d174f405aa1039835f47f7560`
//         });

//         this.getArticles(nextProps.default);
//     }
// }

getArticles(url){

    axios
        .get(`https://newsapi.org/v2/everything?sources=the-guardian-uk&q=graffiti&apiKey=fc7cb33d174f405aa1039835f47f7560`)
        .then(res=>{
            const articles= res.data.articles;

            this.setState({articles: articles});
        })
        .catch(error=> {
            console.log(error);
        });
}



render() {
    return (
      <div className="cardsContainer">
        {this.state.articles.map((news, i) => {
          return (
            <div className="card" key={[i]}>
              <div className="content">
                <h3 className="url">
                  <a href={news.url} target="_blank">
                    {news.title}
                  </a>
                </h3>
                <p>{news.description}</p>
                <div className="author">
                  <p>
                    By <i>{news.author ? news.author : this.props.default}</i>
                  </p>
                  
                </div>
              </div>
              <div>
                <img className="unsplash"src={news.urlToImage} alt="" />
              </div>
            
            </div>
          );
        })}
      </div>
    );
  }





}

export default News;