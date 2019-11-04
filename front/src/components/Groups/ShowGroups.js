import React from "react";
import Events from "../Events/Events.js";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

let aux = [];

class ShowGroups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events : [
        {
          name        : "",
          description : "",
          image       : ""
        }
      ]
    };
    this.renderEvents = this.renderEvents.bind(this);
  }

  componentDidMount() {
    fetch("https://www.eventbriteapi.com/v3/events/79481837315/", {
      headers : {
        Authorization  : process.env.PERSONAL_OAUTH_TOKEN,
        "Content-Type" : "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          events : [
            {
              name        : data.name.text,
              description : data.description.text,
              image       : data.logo.url
            }
          ]
        });
      });
    fetch("https://www.eventbriteapi.com/v3/events/78002049229/", {
      headers : {
        Authorization  : process.env.PERSONAL_OAUTH_TOKEN,
        "Content-Type" : "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        aux = {
          name        : data.name.text,
          description : data.description.text,
          image       : data.logo.url
        };

        this.setState({
          events : this.state.events.concat(aux)
        });
        aux = [];
      });
  }
  renderEvents() {
    return this.state.events.map((e) => {
      return (
        <div className="col">
          <Events key={e.name} name={e.name} url={e.image} description={e.description} />
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="row">{this.renderEvents()}</div>
        <Link to="/CreateGroup" className="nav-link btn ">
          Create a new group
        </Link>
      </div>
    );
  }
}

export default ShowGroups;
