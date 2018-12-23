import React, { Component } from "react";
import Tone from "../components/Tone.js";
import Chart from "chart.js";
import Solo from "./Solo.js";

class Analysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "solo",
      exchangePattern: []
    };
  }

  componentDidMount() {
    // this.toneAnalysis();
    this.convoAnalysis()
  }

  toneAnalysis = () => {
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: this.props.toneAnalysis.document_tone.tones.map(
          tone => tone.tone_name
        ),
        datasets: [
          {
            label: "# of Votes",
            data: this.props.toneAnalysis.document_tone.tones.map(
              tone => tone.score
            ),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {}
    });
  };

  convoAnalysis = () => {
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "radar",
      data: {
        labels: ['Excited', 'Frustrated','Rude', 'Polite', 'Sad', 'Sympathetic'],
        datasets: [
          {
            label: "Your tone",
            data: this.props.toneAnalysis.document_tone.tones.map(
              tone => tone.score
            ),
            backgroundColor: [
              "rgba(255, 0, 255, 0.2)"

            ],
            borderColor: [
              "rgba(255, 0, 255, 1)"

            ],
            borderWidth: 1
          },
          {
            label: "their tone",
            data: [.6, .9, .8, .9, .3],
            backgroundColor: [
              "rgba(21, 25, 255, 0.2)"
            ],
            borderColor: [
              "rgba(21, 25, 255, 1)"

            ],
            borderWidth: 1
          }
        ]
      },
      options: {}
    });
  };

  logger = () => {
    console.log(this.props.convoAnalysis);
  };

  render() {
    return (

        <div className="graph">
          <canvas id="myChart" width="500" height="500" />
        </div>


    );
  }
}

export default Analysis;

//List individual tones/scores
/*
  {this.props.toneAnalysis.document_tone.tones.map(tone => (
    <Tone tone={tone} />
  ))}
*/
