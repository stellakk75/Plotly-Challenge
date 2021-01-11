//populates the sample id into drop down menu 
function populate(){
    // grab dropdown menu 
    let dropDown = d3.select('#selDataset')

    // populates the ID in dropDown menu 
    d3.json("samples.json").then(data => {
        //for each numerical value in "name" array, add it to drop down menu (index.html)
        data.names.forEach(function(name) {
        dropDown.append("option").text(name).property('value');
        });
        
        //default id = 940 so there will be default charts present
        // look in function buildBar for more detailed comments 
        let array = data.samples.filter(sampleObj => sampleObj.id == 940);
        let result = array[0];
        let sample_values = result.sample_values;       
        let otu_ids = result.otu_ids
        let otu_labels = result.otu_labels
        let trace = {
            y: otu_ids.slice(0,10).map(item => "OTU " + item).reverse(),
            x: sample_values.slice(0,10).reverse(),
            orientation: 'h',
            text: otu_labels.slice(0,10).reverse(),
            type: "bar"
          };
        let barchart = [trace];
        Plotly.newPlot("bar", barchart);
        let trace_bubble = {
            y: result.sample_values,
            x: result.otu_ids,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: result.otu_ids,
            },
            text: result.otu_labels,
            type: "bubble"
          };
        let bubble_chart = [trace_bubble];
        let bubble_layout =  {
            xaxis: {title:'OTU ID'}
        }
        Plotly.newPlot("bubble", bubble_chart, bubble_layout);
        let array2 = data.metadata.filter(sampleObj => sampleObj.id == 940);
        let result2 = array2[0]   
        let demographic = d3.select('#sample-metadata')
        keyValue = Object.entries(result2)
        keyValue.forEach(d => {
            demographic.append('tr').text(d[0]+': '+d[1])
        })

//Attempt of bonus 
    var bonus = [
        {
            domain: { x: [0,1], y: [0, 1] },
            type: 'indicator',
            value: result2.wfreq,
            title: { text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week" },
            gauge: { axis: { range: [null,9] },
                steps: [{range:[0,1]},{range:[1,2]},{range:[2,3]},{range:[3,4]},
                {range:[4,5]},{range:[5,6]},{range:[6,7]},{range:[7,8]},{range:[8,9]}]},
            mode: "gauge+number",
        }];
    Plotly.newPlot('gauge', bonus);
    })

}

//main function 
function buildBar(value){
    //select dropdown menu 
    dropDown = d3.select('#selDataset')
    // assigns value of change id to variable 
    let id = dropDown.property("value")

    //read file. then grab relevant data and create visualizations accordingly 
    d3.json('samples.json').then(data=>{

        //filter for user ID = JSON file ID 
        let level = data.samples;
        let array = level.filter(sampleObj => sampleObj.id == id);
        let result = array[0];

        // pull out JSON info for charts 
        let sample_values = result.sample_values;
        let otu_ids = result.otu_ids
        let otu_labels = result.otu_labels

// ------------------------------------------//
        //slice first 10 values for horizontal bar chart 
        let trace = {
            y: otu_ids.slice(0,10).map(item => "OTU " + item).reverse(),
            x: sample_values.slice(0,10).reverse(),
            orientation: 'h',
            text: otu_labels.slice(0,10).reverse(),
            type: "bar"
          };

        let barchart = [trace];

        Plotly.newPlot("bar", barchart);
// ------------------------------------------//
        // create bubble chart 
        let trace_bubble = {
            y: result.sample_values,
            x: result.otu_ids,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: result.otu_ids,
            },
            text: result.otu_labels,
            type: "bubble"
          };
        
        let bubble_chart = [trace_bubble];

        let bubble_layout =  {
            xaxis: {title:'OTU ID'}
        }
          
        Plotly.newPlot("bubble", bubble_chart, bubble_layout);
// --------------------------------------------------------------//
    // Display the sample's metadata (demographic information)
    let level2 = data.metadata
    let array2 = level2.filter(sampleObj => sampleObj.id == id);
    let result2 = array2[0]

    let demographic = d3.select('#sample-metadata')
    
    //clear data 
    demographic.html("");
    //returns key and value of result2 array
    keyValue = Object.entries(result2)
    // console.log(keyValue)
    // for each keyvalue in result2 array, append to demographic info
    keyValue.forEach(d => {
        demographic.append('tr').text(d[0]+': '+d[1])
    })
// --------------------------------------------------------------//
//bonus: Gauge Chart
    var bonus = [
        {
            domain: { x: [0,1], y: [0, 1] },
            type: 'indicator',
            value: result2.wfreq,
            title: { text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week" },
            gauge: { axis: { range: [null,9] },
                steps: [{range:[0,1]},{range:[1,2]},{range:[2,3]},{range:[3,4]},
                {range:[4,5]},{range:[5,6]},{range:[6,7]},{range:[7,8]},{range:[8,9]}]},
            mode: "gauge+number",
        }]

    Plotly.newPlot('gauge', bonus);
    })
};

//starter function 
function start(){
    populate()
    // if dropdown menu changes, then buildBar 
    d3.select('#selDataset').on('change', buildBar)
}

start()