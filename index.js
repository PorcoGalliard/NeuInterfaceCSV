document.getElementById('inputfile').addEventListener('change', function() { 
    var fr=new FileReader(); 
    fr.onload=function(){ 
        // split the file content by new line to get each row
        var rows = fr.result.split("\n");
        // create an empty array to store the data
        var data = [];
        // loop through each row
        for (var i = 0; i < rows.length; i++) {
            // split the row by comma to get each cell
            var cells = rows[i].split(",");
            // access the first cell (index 0) of the row
            var firstCell = cells[0];
            // access the second cell (index 1) of the row
            var secondCell = cells[1];
            // add the first and second cell values to the data array
            data.push([firstCell, secondCell]);
        }
        // create the map using the data from the CSV file
        Highcharts.getJSON('kelurahan_semarang.json', function (geojson) {
            // Initialize the chart
            Highcharts.mapChart('container', {
                chart: {
                    map: geojson,
                    width: 1000,
                    height: 1000,
                },
                title: {
                    text: 'Persebaran Data Dummy di Seluruh Kelurahan di Kota Semarang'
                },
                accessibility: {
                    typeDescription: 'Map of Semarang.'
                },
                mapNavigation: {
                    enabled: true,
                    buttonOptions: {
                        verticalAlign: 'bottom'
                    }
                },
                // colorAxis: {
                //     min: 1,
                //     type: 'logarithmic',
                //     minColor: '#EEEEFF',
                //     maxColor: '#000022',
                //     stops: [
                //         [0, '#EFEFFF'],
                //         [500, '#4444FF'],
                //         [1000, '#000022']
                //     ]
                // },
                colorAxis: {
                    dataClasses: [{
                      from: 0,
                      to: 100,
                      color: '#F9EDB3'
                    }, {
                      from: 100,
                      to: 250,
                      color: '#FFC428'
                    }, {
                      from: 250,
                      to: 500,
                      color: '#FF7987'
                    }, {
                      from: 500,
                      color: '#FF2371'
                    }]
                  },
                series: [{
                    data: data,
                    keys: ['kode', 'value'],
                    joinBy: 'kode',
                    name: 'Random data',
                    states: {
                        hover: {
                            color: '#a4edba'
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        format: '{point.properties.name}'
                    }
                }]
            });
        });
        };
        fr.readAsText(this.files[0]);
      });