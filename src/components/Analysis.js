import React, { Component } from "react";
import Tone from "../components/Tone.js";
import Chart from "chart.js";

class Analysis extends Component {
  componentDidMount() {
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
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }

  logger = () => {
    console.log(this.props.toneAnalysis);
  };

  render() {
    return (
      <div className="graph">
        <canvas id="myChart" width="400" height="400" />
        {this.props.toneAnalysis.document_tone.tones.map(tone => (
          <Tone tone={tone} />
        ))}
        <button onClick={this.logger}> logger </button>
      </div>
    );
  }
}

export default Analysis;
