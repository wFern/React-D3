import React, {Component} from 'react';
import * as d3 from 'd3';
import ReactDOM from "react-dom";
import * as topojson from "topojson";
import worldData from '../../../data/world-50m';
// import trackData from '../../../data/track.json';

class MapScrollerSVG extends Component {

    componentDidMount(){

        const el = ReactDOM.findDOMNode(this);

        const projection = d3.geoMercator()
            .scale(5 * (this.props.width + 1) / 2 / Math.PI)
            .translate([this.props.width / 2, this.props.height / 2])
            .rotate([-125, -15, 0])
            .precision(.1);

        const graticule = d3.geoGraticule();
        const pathGenerator = d3.geoPath().projection(projection);

        d3.select(el).append("path")
            .datum(graticule)
            .attr("class", "graticule")
            .attr("d", pathGenerator);

        d3.select(el).insert("path", ".graticule")
            .datum(topojson.feature(worldData, worldData.objects.land))
            .attr("class", "land")
            .attr("d", pathGenerator);

        d3.json('../../../data/track.json', function(error, track) {
            console.log(track);
        });
    }

    render(){
        return (
            <svg id="map" width={this.props.width} height={this.props.height}>
            </svg>
        )
    }

}

export default MapScrollerSVG;