<template>
  <div class="page">

  </div>
</template>

<script>
// import * as d3 from "d3";
var i = 0, j = 0, n = 0, m = 0;
var gap = 20;
export default {
  data() {
    return {
      Donut3D: {},
	    // i: 0, j: 0, n: 0, m: 0,
      // gap: 20,
      salesData: [
        {label:"Basic", color:"#9b3369", value: 10, values: 90},
        {label:"Basic", color:"#FF9900", value: 5, values: 90},
        {label:"Elite", color:"#e74d76",value: 20, values: 90},
        {label:"Elite", color:"#3366cc",value: 30, values: 90},
      ]
    };
  },
  methods: {

    pieTop(d, rx, ry, ir ){
      let basci = i*gap;
      i++;
      if(d.endAngle - d.startAngle == 0 ) return "M 0 0";
      var sx = rx*Math.cos(d.startAngle),
        sy = ry*Math.sin(d.startAngle),
        ex = rx*Math.cos(d.endAngle),
        ey = ry*Math.sin(d.endAngle);
        
        let ssy = sy-basci;
        let eey = ey-basci;
        let iey = ir*ey-basci;
        let isy = ir*sy-basci;
      var ret =[];
      
      ret.push("M",sx,ssy,"A",rx,ry,"0",(d.endAngle-d.startAngle > Math.PI? 1: 0),"1",ex,eey,"L",ir*ex,iey);
      ret.push("A",ir*rx,ir*ry,"0",(d.endAngle-d.startAngle > Math.PI? 1: 0), "0",ir*sx,isy,"z");
      return ret.join(" ");
    },
	
    pieOuter(d, rx, ry, h ){
      let basci = j*gap;
      j++;
      var startAngle = (d.startAngle > Math.PI ? Math.PI : d.startAngle);
      var endAngle = (d.endAngle > Math.PI ? Math.PI : d.endAngle);
      
      var sx = rx*Math.cos(startAngle),
        sy = ry*Math.sin(startAngle),
        ex = rx*Math.cos(endAngle),
        ey = ry*Math.sin(endAngle);
        
        let eey = ey-basci;
        let ssy = sy-basci;
        
        var ret =[];
        ret.push("M",sx,h+sy,"A",rx,ry,"0 0 1",ex,h+ey,"L",ex,eey,"A",rx,ry,"0 0 0",sx,ssy,"z");
        return ret.join(" ");
    },

    pieInner(d, rx, ry, h, ir ){
      let basci = n*gap;
      n++;
      var startAngle = (d.startAngle < Math.PI ? Math.PI : d.startAngle);
      var endAngle = (d.endAngle < Math.PI ? Math.PI : d.endAngle);
      
      var sx = ir*rx*Math.cos(startAngle),
        sy = ir*ry*Math.sin(startAngle),
        ex = ir*rx*Math.cos(endAngle),
        ey = ir*ry*Math.sin(endAngle);
        
        let ssy = sy-basci;
        let eey = ey-basci;

        var ret =[];
        ret.push("M",sx, ssy,"A",ir*rx,ir*ry,"0 0 1",ex,eey, "L",ex,h+ey,"A",ir*rx, ir*ry,"0 0 0",sx,h+sy,"z");
        return ret.join(" ");
    },
    
    pieSide(d, rx, ry, ir ){
      let basci = m*gap;
      m++;
      
      if(d.endAngle - d.startAngle == 0 ) return "M 0 0";
      
      if(d.startAngle>0 && d.startAngle<=Math.PI/2){
        return "M 0 0";
      }
      
      var sx = rx*Math.cos(d.startAngle),
        sy = ry*Math.sin(d.startAngle),
        ex = rx*Math.cos(d.endAngle),
        ey = ry*Math.sin(d.endAngle);
        
        let ssy = sy-basci;
        let eey = ey-basci;
        let iey = ir*ey-basci;
        let isy = ir*sy-basci;
        
      var ret =[];
      
      // 最后一个side
      if( d.endAngle.toFixed(2) == 2*Math.PI.toFixed(2) ){
        console.log('ss')
        ret.push("M",ex,eey,"L",ir*ex,iey,"L",ir*ex,iey+basci,"L",ex,eey+basci,"z");
        ret.push("M",sx,ssy+gap,"L",sx,ssy,"L",ir*sx,isy,"L",ir*sx,isy+gap,"z");
      }else{
        ret.push("M",sx,ssy+gap,"L",sx,ssy,"L",ir*sx,isy,"L",ir*sx,isy+gap,"z");
      }
      return ret.join(" ");
    },

    getPercent(d){
      return (d.endAngle-d.startAngle > 0.2 ? 
          Math.round(1000*(d.endAngle-d.startAngle)/(Math.PI*2))/10+'%' : '');
    },
  },
  mounted(){
    // console.log(d3)
    this.Donut3D.draw=function(id, data, x /*center x*/, y/*center y*/, 
			rx/*radius x*/, ry/*radius y*/, h/*height*/, ir/*inner radius*/){
	console.log(d3)
      var _data = d3.layout.pie().sort(null).value(function(d) {return d.value;})(data);
      
      var slices = d3.select("#"+id).append("g").attr("transform", "translate(" + x + "," + y + ")")
        .attr("class", "slices");
        
      slices.selectAll(".innerSlice").data(_data).enter().append("path").attr("class", "innerSlice")
        .style("fill", function(d) { return d3.hsl(d.data.color).darker(0.7); })
        .attr("d",function(d){ return pieInner(d, rx+0.5,ry+0.5, h, ir);})
        .each(function(d){this._current=d;});
      
      slices.selectAll(".sideSlice").data(_data).enter().append("path").attr("class", "sideSlice")
        // .style("fill", function(d) { return d.data.color; })
        // .style("stroke", function(d) { return d.data.color; })
        .style("fill", function(d) { return d3.hsl(d.data.color).darker(0.5); })
        .attr("d",function(d){ return pieSide(d, rx, ry, ir);})
        .each(function(d){this._current=d;});
        
      slices.selectAll(".topSlice").data(_data).enter().append("path").attr("class", "topSlice")
        .style("fill", function(d) { return d.data.color; })
        .style("stroke", function(d) { return d.data.color; })
        .attr("d",function(d){ return pieTop(d, rx, ry, ir);})
        .each(function(d){this._current=d;});
        
      slices.selectAll(".outerSlice").data(_data).enter().append("path").attr("class", "outerSlice")
        .style("fill", function(d) { return d3.hsl(d.data.color).darker(0.7); })
        .attr("d",function(d){ return pieOuter(d, rx-.5,ry-.5, h);})
        .each(function(d){this._current=d;});

      // slices.selectAll(".percent").data(_data).enter().append("text").attr("class", "percent")
      // 	.attr("x",function(d){ return 0.6*rx*Math.cos(0.5*(d.startAngle+d.endAngle));})
      // 	.attr("y",function(d){ return 0.6*ry*Math.sin(0.5*(d.startAngle+d.endAngle));})
      // 	.text(getPercent).each(function(d){this._current=d;});				
    }
    this.Donut3D.draw("salesDonut", this.salesData, 150, 150, 100, 60, 100, 0.5);  
  }
};
</script>

<style lang="scss" scoped>
</style>
