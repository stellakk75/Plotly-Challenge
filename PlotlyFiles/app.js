


function populate(){
    // grab dropdown menu 
    let dropDown = d3.select('#selDataset')

    // populate the ID in dropDown menu 
    d3.json("samples.json").then(data => {
        //for each numerical value in "name" array, add it to drop down menu (index.html)
        data.names.forEach(function(name) {
        dropDown.append("option").text(name).property('value');
        });
    })

}



function buildBar(value){

    //select dropdown menu 
    dropDown = d3.select('#selDataset')
    // assigns value of change id to variable 
    let id = dropDown.property("value")
    // console.log(id)

    d3.json('samples.json').then(data=>{

        let level = data.samples;
        let array = level.filter(sampleObj => sampleObj.id == id);
        let result = array[0];
        // console.log(result)

        let sample_values = result.sample_values
        // console.log(sample_values)
        
        let otu_ids = result.otu_ids
        // console.log(result.otu_ids)

        let otu_labels = result.otu_labels
        // console.log(otu_labels)

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

    // Display the sample metadata, i.e., an individual's demographic information.
    let level2 = data.metadata
    let array2 = level2.filter(sampleObj => sampleObj.id == id);
    let result2 = array2[0]
    // console.log(result2)

    let demographic = d3.select('#sample-metadata')

    demographic.html("");
    //returns key and value of result2 array
    keyValue = Object.entries(result2)
    console.log(keyValue)
    // for each keyvalue in result2 array, append to demographic info
    keyValue.forEach(d => {
        demographic.append('tr').text(d[0]+': '+d[1])
    })

    })
}


function start(){
    
    populate()
    
    // if dropdown menu changes, then buildBar 
    d3.select('#selDataset').on('change', buildBar)
}

start()

// set default as 940. change color scheme for bubble chart. attempt bonus? 