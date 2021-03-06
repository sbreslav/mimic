// Various accessors that specify the four dimensions of data to visualize.
var intFormat = d3.format(",d");

function scatterPlotRun(condition_name, task, selectionCallback) {
// Chart dimensions.

var startYear = task.years[0];
var endYear = task.years[1];

function x(d) { return d[task.indicators[0]]; }
function y(d) { return d[task.indicators[1]]; }
function radius(d) { return d.population; }
function color(d) { return d.region; }
function key(d) { return d.name; }

var xValformat = function(d){ return "<strong>"+task.indicatorLabels[0]+"</strong>: "+intFormat(d3.round(d,0))+ " "+ task.indicatorUnits[0]; };
var yValformat = function(d){ return "<strong>"+task.indicatorLabels[1]+"</strong>: "+ intFormat(d3.round(d,0))+ " "+ task.indicatorUnits[1]; };

var margin = {top: 19.5, right: 19.5, bottom: 39.5, left: 39.5},
    width = 700 - margin.right,
    height = 500 - margin.top - margin.bottom;

// Various scales. These domains make assumptions of data, naturally.
var xScale = task.indicatorDomains[0].range([0, width]),
    yScale = task.indicatorDomains[1].range([height, 0]),
    radiusScale = d3.scale.sqrt().domain([0, 5e8]).range([0, 40]),
    colorScale = d3.scale.category10();

var tip = d3.tip().attr('class', 'd3-tip').offset([-10, 0]).html(function(d) { return d.x + "<br>" + d.y; });

var selectionColor = "green";
var hoverColor = "steelblue";
var regularColor = "black";

// The x & y axes.
var xAxis = d3.svg.axis().orient("bottom").scale(xScale).ticks(12, d3.format(",d")),
    yAxis = d3.svg.axis().scale(yScale).orient("left");


// Create the SVG container and set the origin.
var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("class", "gRoot");

// Add the x-axis.
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

// Add the y-axis.
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

// Add an x-axis label.
svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + 36)
    .text(task.indicatorLabels[0]+" ("+task.indicatorUnits[0]+")");

// Add a y-axis label.
svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -40)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text(task.indicatorLabels[1]+" ("+task.indicatorUnits[1]+")");

svg.call(tip);

// Add the year label; the value is set on transition.
var label = svg.append("text")
    .attr("class", "year label")
    .attr("text-anchor", "end")
    .attr("y", 24)
    .attr("x", width)
    .text(startYear);

// Add the country label; the value is set on transition.
var countrylabel = svg.append("text")
    .attr("class", "countryLabel label")
    .attr("text-anchor", "start")
    .attr("y", 24)
    .attr("x", 20)
    .text(" ");

var first_time = true;

// Load the data.
var mainurl = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
d3.json(mainurl+"/static/data/nations.json", function(nations) {
  var maxCountries=18;
  nations = task.countries.map(function(i){ return nations[i] });
  // A bisector since many nation's data is sparsely-defined.
  var bisect = d3.bisector(function(d) { return d[0]; });

  // Add a dot per nation. Initialize the data at 1800, and set the colors.
  var selectedDot;
  var selectedCountry = "";
  var dot = svg.append("g")
      .attr("class", "dots")
    .selectAll(".dot")
      .data(interpolateData(startYear))
    .enter().append("circle")
      .attr("class", "dot")
      .style("opacity", .4)
      .style("fill", function(d) { return regularColor;}) //return colorScale(color(d)); })
      .call(position)
      .on("click", function(d, i) {
        selectedCountry = d.name;
        selectionCallback(selectedCountry);
        countrylabel.style("fill", selectionColor);
        dot.classed("selected", false);
        dot.style("opacity", .3);
        dot.style("fill", regularColor);
        //selectedDot.moveToBack();
        selectedDot = d3.select(this);
        
        selectedDot.classed("selected", !d3.select(this).classed("selected"));
        selectedDot.style("opacity", 1);
        selectedDot.style("fill", selectionColor);
        selectedDot.moveToFront();
        //dragit.trajectory.display(d, i, "selected");


      })
      .on("mouseenter", function(d, i) {
        //console.log(d, xValformat(x(d)), yValformat(y(d)));
        tip.show(
             {x: xValformat(x(d)), 
              y: yValformat(y(d))},i);

        //clear_demo();
        //if(dragit.statemachine.current_state == "idle") {
          //dragit.trajectory.display(d, i)
          //dragit.utils.animateTrajectory(dragit.trajectory.display(d, i), dragit.time.current, 1000)
          countrylabel.text(d.name);
          if(d.name === selectedCountry){
            countrylabel.style("fill", selectionColor);
          }else{
            countrylabel.style("fill", hoverColor);  
          }          
          //dot.style("opacity", .4)
          d3.select(this).style("fill", hoverColor);
          d3.select(this).style("opacity", 1).moveToFront();
          //d3.selectAll(".selected").style("opacity", 1)
        //}
      })
      .on("mouseleave", function(d, i) {
        tip.hide(d,i);
        //if(dragit.statemachine.current_state == "idle") {
          countrylabel.text(selectedCountry);
          countrylabel.style("fill", selectionColor);
          

          dot.style("fill", regularColor);
          
          if(selectedDot){
            dot.style("opacity", .3);
            selectedDot.style("fill", selectionColor);
            selectedDot.style("opacity", 1);
          }else{
            dot.style("opacity", .4);
          }
        //}
  
        //dragit.trajectory.remove(d, i);
        
      });
      //.call(dragit.object.activate)

  // Add a title.
  //dot.append("title")
  //    .text(function(d) { return d.name; });

  // Start a transition that interpolates the data based on year.
  //svg.transition()
  //    .duration(3000)
  //    .ease("linear");

  // Positions the dots based on data.
  function position(dot) {
    dot.attr("cx", function(d) { return xScale(x(d)); })
       .attr("cy", function(d) { return yScale(y(d)); })
       .attr("r", function(d) { return 8; });//radiusScale(radius(d)); });
  }

  // Defines a sort order so that the smallest dots are drawn on top.
  function order(a, b) {
    return radius(b) - radius(a);
  }

  // Updates the display to show the specified year.
  function displayYear(year) {
    dot.data(interpolateData(year), key).call(position).sort(order);
    label.text(Math.round(year));
  }

  // Interpolates the dataset for the given (fractional) year.
  function interpolateData(year) {
    return nations.map(function(d) {
      return {
        name: d.name,
        region: d.region,
        income: interpolateValues(d.income, year),
        population: interpolateValues(d.population, year),
        lifeExpectancy: interpolateValues(d.lifeExpectancy, year)
      };
    });
  }

  // Finds (and possibly interpolates) the value for the specified year.
  function interpolateValues(values, year) {
    var i = bisect.left(values, year, 0, values.length - 1),
        a = values[i];
    if (i > 0) {
      var b = values[i - 1],
          t = (year - a[0]) / (b[0] - a[0]);
      return a[1] * (1 - t) + b[1] * t;
    }
    return a[1];
  }
  
  init();

function update(v, duration) {
    dragit.time.current = v;
    displayYear(dragit.time.current);

    if(condition_name === "interactive_viz"){
       d3.select("#slider-time").property("value", dragit.time.current-dragit.time.min);   
    }   
}

function init() {

    dragit.init(".gRoot");

    dragit.time = {min:startYear, max:endYear, step:1, current:startYear};
    dragit.data = d3.range(nations.length).map(function() { return Array(); });

    for(var yy = startYear; yy<endYear; yy++) {

      interpolateData(yy).filter(function(d, i) { 
        dragit.data[i][yy-dragit.time.min] = [xScale(x(d)), yScale(y(d))];

      });
    }

    //dragit.evt.register("update", update);

    //d3.select("#slider-time").property("value", dragit.time.current);
    if(condition_name === "interactive_viz"){
      d3.select("#slider-time")
      .on("input", function() { 
        //console.log("slider-time: input");
        update(parseInt(this.value)+dragit.time.min);
        clear_demo();
      });
    }else if(condition_name === "animated_viz"){
      
      d3.select("#rewind_button") 
      .on("click", function() { 
          stop_play();
          dragit.time.current =dragit.time.min;
          update(dragit.time.current);
      });

      d3.select("#rewind_forward_button") 
      .on("click", function() { 
          stop_play();
          dragit.time.current =dragit.time.max;
          update(dragit.time.current);
      });

      
      d3.select("#fast_backward_button") 
      .on("mousedown", function() { 
          stop_play();
          //console.log("fast_backward_button down");
          play_demo(-1, 100);  
      });
      d3.select("#fast_backward_button") 
      .on("mouseup", function() { 
          //console.log("fast_backward_button up");
          //clearInterval(demo_interval);
          stop_play();
          demo_interval = null;
      });

      
      d3.select("#fast_forward_button") 
      .on("mousedown", function() { 
          stop_play();
          play_demo(1, 100);  
      });
      d3.select("#fast_forward_button") 
      .on("mouseup", function() { 
          //clearInterval(demo_interval);
          stop_play();
          demo_interval = null;
      });

      

      //fast_forward_button
      d3.select("#play_button")
      .on("click", function() { 
        //update(parseInt(this.value), 500);
        if(demo_interval){
          d3.select("#play_button").html('Play <i class="fa fa-play"></i>');
          clearInterval(demo_interval);
          demo_interval = null;
          clear_demo();
        }else{
          d3.select("#play_button").html('Pause <i class="fa fa-pause"></i>');
          if(dragit.time.current >= dragit.time.max){
            dragit.time.current =  dragit.time.min;
          }
          play_demo(1, 400);  
        }
        
      });
    }

    var end_effect = function() {
      countrylabel.text("");
      //dot.style("opacity", 1);
    };

    //dragit.evt.register("dragend", end_effect);
}
function stop_play() {
  d3.select("#play_button").html('Play <i class="fa fa-play"></i>');
  clearInterval(demo_interval);
  demo_interval = null;
}
function clear_demo() {
  if(first_time) {
    svg.transition().duration(0);
    first_time = false;
    clearInterval(demo_interval);
    //countrylabel.text("");
    //dragit.trajectory.removeAll();
    //d3.selectAll(".dot").style("opacity", 1);
  }
}
var demo_interval = null;

function play_demo(dir, timeout){
  
  demo_interval = setInterval(function() {
    //console.log("playing", dragit.time.current);
    if(dir > 0 && (dragit.time.current+dir) <= dragit.time.max) {
      dragit.time.current += dir;
      update(dragit.time.current);
    } else if(dir < 0 && (dragit.time.current+dir) >= dragit.time.min) {
      dragit.time.current += dir;
      update(dragit.time.current);
    } else {
      clearInterval(demo_interval);
      demo_interval = null;
      d3.select("#play_button").html('Play <i class="fa fa-play"></i>');
    }    
  }, timeout);
}

}); // on data load



} // end of function