//  立即执行函数
// 1 bar
(function () {
    var myChart = echarts.init(document.querySelector(".bar .chart"));
    let shandian = 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAOCAMAAADKSsaaAAAAclBMVEUAAACAAADMAAC2AAC/AADIAADMAADRAADKAADMCAjPCAjJBwfMBgbLBgbNBgbLBQXLBQXNCQnMCAjOCQnMCAjNCQnMCQnPCgrNCgrOCQnOCwvNCgrOCgrOCgrOCgrNCgrOCwvOCgrNCgrOCgrOCgrOCwto2NwFAAAAJXRSTlMAAgUHCA4UFhgeICYoLC4xNjhBVHmKjZmvvcLO3+Hj7O/4+/3+bk5NRAAAAE5JREFUCB0FwQkCgQAABMBBFHIU5Qqh/f8XzQDzI8C9AfRTDZx+qcAhSQHrMXnB8pEkyUU3DJ8ktwW8k2cJRfLdglXSApvpDNhfZ4Ad8AeiCgXoDXM13gAAAABJRU5ErkJggg==';
    let path = ["", shandian, "", shandian, "", shandian];
    let todayData = [502.84, 205.97, 332.79, 281.55, 398.35, 214.02];
    let markProfile = todayData.map((item, index) => {
        return {
            coord: [index, item]
        }
    });
    option = {
        backgroundColor: '',
        title: {
            show: false,
            text: '',
            textStyle: {
                align: 'center',
                color: '#fff',
                fontSize: 20,
            },
            top: '5%',
            left: 'center',
        },
        toolbox:{
            backgroundColor:"rgba(255,255,255,0.7)",
        },
        tooltip: {
            trigger: 'axis',
             backgroundColor:"rgba(255,255,255,0.7)",
            axisPointer: {
                lineStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(0, 255, 233,0)'
                        }, {
                            offset: 0.5,
                            color: 'rgba(255, 255, 255,1)',
                        }, {
                            offset: 1,
                            color: 'rgba(0, 255, 233,0)'
                        }],
                        global: false
                    }
                },
            },
        },
        grid: {
            top: '5%',
            left: '5%',
            right: '8%',
            bottom: '5%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            axisLine: {
                show: true
            },
            splitArea: {
                // show: true,
                color: '#f00',
                lineStyle: {
                    color: '#f00'
                },
            },
            axisLabel: {
                color: '#fff'
            },
            splitLine: {
                show: false
            },
            boundaryGap: false,
            data: ['2016', '2017', '2018', '2019', '2020', '2021'],

        }],

        yAxis: [{
            type: 'value',
            min: 0,
            // max: 140,
            splitNumber: 4,
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['#fff'],
                    opacity: 0.06
                }
            },
            axisLine: {
                show: false,
            },
            axisLabel: {
                show: true,
                margin: 20,
                textStyle: {
                    // fontSize: ,
                    color: 'rgba(255,255,255,0.5)'
                }
            },
            axisTick: {
                show: false,
            },
        }],
        series: [{
                name: '文科',
                type: 'line',
                smooth: true, //是否平滑
                showAllSymbol: true,
                // symbol: 'image://./static/images/guang-circle.png',
                symbol: 'circle',
                symbolSize: 1,
                lineStyle: {
                    normal: {
                        color: "#FFBC0D",
                        shadowColor: 'rgba(0, 0, 0, 0)',
                        shadowBlur: 0,
                        shadowOffsetY: 5,
                        shadowOffsetX: 5,
                    },
                },
                markPoint: {
                    //   symbol: shandian,
                    symbolSize: [6, 16],
                    symbolOffset: [30, -27],
                    label: {
                        show: false,
                        // padding:50,
                    },
                    itemStyle: {
                        color: "red",
                        borderColor: "rgb(108,78,0)",
                        borderWidth: 0,
                        shadowColor: 'rgba(0, 0, 0, 0)',
                        shadowBlur: 0,
                        shadowOffsetY: 0,
                        shadowOffsetX: 0,
                    },
                    symbol: "arrow",
                    data: markProfile
                },
                label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: '#FFF',
                        fontSize: 12
                    }
                },
                itemStyle: {
                    color: "#FFBC0D",
                    borderColor: "rgb(108,78,0)",
                    borderWidth: 0,
                    shadowColor: 'rgba(0, 0, 0, 0)',
                    shadowBlur: 0,
                    shadowOffsetY: 0,
                    shadowOffsetX: 0,
                },
                tooltip: {
                    show: true
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                                offset: 0,
                                color: 'rgba(255,188,13, 0.4)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(255,188,13, 0)'
                            }
                        ],
                        global: false // 缺省为 false
                    }
                },
                data: todayData
            },
            {
                name: '理科',
                type: 'line',
                smooth: true, //是否平滑
                showAllSymbol: true,
                // symbol: 'image://./static/images/guang-circle.png',
                symbol: 'circle',
                symbolSize: 10,
                lineStyle: {
                    normal: {
                        color: "#41B5FF",
                        shadowColor: 'rgba(0, 0, 0, 0)',
                        shadowBlur: 0,
                        shadowOffsetY: 5,
                        shadowOffsetX: 5,
                    },
                },
                label: {
                    show: false,
                    position: 'top',
                    textStyle: {
                        color: '#fff',
                        fontSize: 14
                    }
                },
                itemStyle: {
                    color: "#00DAFF",
                    borderColor: "rgb(0,115,100)",
                    borderWidth: 0,
                    shadowColor: 'rgba(0, 0, 0, 0)',
                    shadowBlur: 0,
                    shadowOffsetY: 0,
                    shadowOffsetX: 0,
                },
                tooltip: {
                    show: true
                },
                data: [281.55, 398.35, 214.02, 179.55, 289.57, 356.14, ],
            },
        ]
    };


    myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
})();
// 2 pie
(function () {
    var myChart = echarts.init(document.querySelector(".pie1 .chart"));
    var img = 'data:image/png;base64,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';
const man =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAByCAMAAADzq6aiAAABpFBMVEUAAAAA//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A///ZqXRjAAAAi3RSTlMAAQIDBAYICQoMDQ4RExQWGBkaGxweHyAmJyksLTU4OTo7PD5AQkZHTk9QUVJTVFVYWVpgZGhqa21ucXJzdHZ5fX+AgYKDhoeIi5CRk5WWmZqbn6ChoqOlpqeoqaqsrrW2t7i5uru8vcPFx8jQ0tTX293e4OHi4+Tl5+jr7e7v8PHy8/T2+fr7/P3+d8xxFQAAAmtJREFUaN7t2vlb0zAYB/AAm1zeyKGIByKiQ9zwxgMRhifMCYooh4qgzrMw2awKKhZs80+7jbqkkGzpm/mDz/N+f1rfJZ9nT9ulTVNCiqfu0nTSspJPL9eRUmTnyBp1s/Zgt753/BvlshzS9c7a1BP7nJ53coOXEbt0vPoluinfGzTAJ1SQCbi31xaB9j4weJMKcwsMvhODH6BetS0GnRog2Ewl2Q8ED8vAQ0CwRQa2AMFdMnAP9Kh8EXtLZVBwQgxOgc/DTjF4CgwGDJE3H4D/mbtEoNb4NbbZG9MaYCtfbfQSVXpDdvW013tWq3tRKe/5wbifV8pLcB3dfv3jOmf07wBdRyIDsdH4bZZYLPZ8cXU1NZP5cIeV46P3Brrri2ll4YRDfcR5Eym4ExpeU99JNMq9ps8UELNZ5m01KCjJbRJwhALzUDJA21DQOSgE71Na2p9owMGUELRYA2u2qG7Mcu0dIcifCaSvGNhHTG4LQQQRRBBBBBFEEEG/4C/2/aIKuMDd/gnBt6zBSxXwBdt4LwSjrEGPCniBbdwQPxtdzu/CWhWwJp2fU0qepHb+dvdIO1EBSZt7U2xHZDOfjtxMauEoUQNJW+64mCcKTODDg9FQkKiCJBiKDobVpvhqoI/8Y3AlnclKCcHhbGkYQQQRRBBBBBFEEMH/Brzm6T2ULd3VAs97ekezpX5P6aJP8ICnd+79iw5PqdXvYtk8v1ybu9Gv/MqVPlX4Xes6zfXuXS9d5Upn/K+ePc53nnNXVwNz+dIkYDmuYshdPxvf8rdU5b6Z4cSDoBXC1kcpy5w6xpfaJ00rPX6kQKc/RsXweS7aQLIAAAAASUVORK5CYII=';
const woman =
    'data:image/png;base64,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';
var sexData = [{
    name: '男性',
    value: 23545
}, {
    name: '女性',
    value: 35456
}];

var data = [];
var color = ['#00FFFF', "#C424FF", '#ffa800', '#ff5b00', '#ff3000']
for (var i = 0; i < sexData.length; i++) {
    data.push({
        value: sexData[i].value,
        name: sexData[i].name,
        itemStyle: {
            normal: {
                borderWidth: 5,
                shadowBlur: 20,
                borderColor: color[i],
                shadowColor: color[i]
            }
        }
    }, {
        value: 2,
        name: '',
        itemStyle: {
            normal: {
                label: {
                    show:false,
                    
                    
                },
                labelLine: {
                    show: false
                },
                color: 'rgba(0, 0, 0, 0)',
                borderColor: 'rgba(0, 0, 0, 0)',
                borderWidth: 0
            }
        }
    });
}
var seriesOption = [{
    name: '',
    type: 'pie',
    clockWise: false,
    radius: [70, 70],
    hoverAnimation: true,
    itemStyle: {
        normal: {
            label: {
                show: true,
                position: [0, -20],
                color: '#ddd',
                formatter: function(params) {
                    var percent = 0;
                    var total = 0;
                    for (var i = 0; i < sexData.length; i++) {
                        total += sexData[i].value;
                    }
                    percent = ((params.value / total) * 100).toFixed(0);
                    if (params.name !== '') {
                        return params.name + '：' + percent + '%';
                    } else {
                        return '';
                    }
                },
            },
            labelLine: {
                length: 10,
                length2: 10,
                show: true,
                color: '#00ffff'
            }
        }
    },
    data: data
}];
option = {
    backgroundColor: '',
    color: color,
    graphic: {
        elements: [{
                type: "image",
                z: 3,
                style: {
                    image: img,
                    width: 100,
                    height: 100
                },
                left: 'center',
                top: 'center',
                // position: [50, 50]
            }, {
                type: 'image',
                z: 3,
                style: {
                    image: woman,
                    width: 30,
                    height: 50
                },
                left: '50%',
                top: 'center'
            },
            {
                type: 'image',
                z: 3,
                style: {
                    image: man,
                    width: 30,
                    height: 50
                },
                right: '50%',
                top: 'center'
            }
        ]
    },
    tooltip: {
        show: true
    },
    toolbox: {
        show: true
    },
    series: seriesOption
}


    myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
})();
// 3 line-bar
(function () {
    var myChart = echarts.init(document.querySelector(".line1-bar .chart"));
    option = {
        // backgroundColor: new echarts.graphic.RadialGradient(0.5, 0.5, 0.7, [{
        //     offset: 0,
        //     color: '#efefef'
        // }, {
        //     offset: 0.5,
        //     color: '#efefef'
        // }, {
        //     offset: 1,
        //     color: '#e1e1e3'
        // }]),
        title: {
            text: '',
            textStyle: {
                align: 'center',
                color: '#8598bb',
                fontSize: 12,
            },
            top: '0',
            left: 'center',
        },
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0,0,0,0.9)',
            formatter: "{b}<br/>{c}%",
            textStyle: {
                color: 'white',
            },
        },
        grid: {
            right: 25,
            left: 10,
            top: 10,
            bottom: 25,
        },
        yAxis: [{
            type: 'value',
            show: false,
        }],
        xAxis: [{
            type: 'category',
            axisTick: {
                show: false
            },
            data: ['甘肃', '江苏', '河北', '四川', '云南', '北京', '广东'],
            axisLabel: {
                interval: 0,
                color: '#869ab8',
            },
            splitLine: {
                show: false
            },
            axisLine: {
                show: false
            },
            splitArea: {
                show: false,
            }
        }],
        series: [{
                type: 'pictorialBar',
                symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
                data: [23, 51, 45, 51, 45, 51, 45],
                barWidth: '150%',
                symbolOffset: [0, 0],
                z: 1,
                label: {
                    show: true,
                    formatter: "{c} %",
                    position: 'top',
                    color: '#869ab8',
                },
                itemStyle: {
                    normal: {
                        shadowColor: 'rgba(0, 0, 0, .3)',
                        shadowBlur: 10,
                        shadowOffsetY: -5,
                        shadowOffsetX: 0,
                        color: function (params) {
                            var colorList = [
                                new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0,
                                    color: '#024cc4'
                                }, {
                                    offset: 0.5,
                                    color: '#024cc4'
                                }, {
                                    offset: 0.5,
                                    color: '#015ef3'
                                }, {
                                    offset: 1,
                                    color: '#015ef3'
                                }]),
                                new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0,
                                    color: '#5d01d1'
                                }, {
                                    offset: 0.5,
                                    color: '#5d01d1'
                                }, {
                                    offset: 0.5,
                                    color: '#6c01f3'
                                }, {
                                    offset: 1,
                                    color: '#6c01f3'
                                }]),
                                new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0,
                                    color: '#9602d5'
                                }, {
                                    offset: 0.5,
                                    color: '#9602d5'
                                }, {
                                    offset: 0.5,
                                    color: '#a201f3'
                                }, {
                                    offset: 1,
                                    color: '#a201f3'
                                }]),
                                new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0,
                                    color: '#5d01d1'
                                }, {
                                    offset: 0.5,
                                    color: '#5d01d1'
                                }, {
                                    offset: 0.5,
                                    color: '#6c01f3'
                                }, {
                                    offset: 1,
                                    color: '#6c01f3'
                                }]),
                                new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0,
                                    color: '#9602d5'
                                }, {
                                    offset: 0.5,
                                    color: '#9602d5'
                                }, {
                                    offset: 0.5,
                                    color: '#a201f3'
                                }, {
                                    offset: 1,
                                    color: '#a201f3'
                                }]),
                                new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0,
                                    color: '#5d01d1'
                                }, {
                                    offset: 0.5,
                                    color: '#5d01d1'
                                }, {
                                    offset: 0.5,
                                    color: '#6c01f3'
                                }, {
                                    offset: 1,
                                    color: '#6c01f3'
                                }]),
                                new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0,
                                    color: '#9602d5'
                                }, {
                                    offset: 0.5,
                                    color: '#9602d5'
                                }, {
                                    offset: 0.5,
                                    color: '#a201f3'
                                }, {
                                    offset: 1,
                                    color: '#a201f3'
                                }]),
                            ];
                            return colorList[params.dataIndex]
                        },
                    },
                    emphasis: {
                        opacity: 1
                    }
                },

            },

        ]
    };


    myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
})();

// 4 map
(function () {
    var myChart = echarts.init(document.querySelector(".map"));
    // 获取全国所有市县Geojson数据。下载地址
    var uploadedDataURL = "https://geo.datav.aliyun.com/areas_v2/bound/100000_full.json";

    // var uploadedDataURL = "/asset/get/s/data-1528971808162-BkOXf61WX.json";



    // echarts.extendsMap = function(id, opt) {
    //     // 实例


    //     var cityMap = {
    //         "郑州市": zhengzhou,
    //         "开封市": kaifeng,
    //         "洛阳市": luoyang,
    //         "平顶山市": pingdingshan,
    //         "安阳市": anyang,
    //         "鹤壁市": hebi,
    //         "新乡市": xinxiang,
    //         "焦作市": jiaozuo,
    //         "濮阳市": puyang,
    //         "漯河市": luohe,
    //         "三门峡市": sanmenxia,
    //         "南阳市": nanyang,
    //         "商丘市": shangqiu,
    //         "信阳市": xinyang,
    //         "周口市": zhoukou,
    //         "许昌市": xuchang,
    //         "驻马店市": zhumadian
    //     };

    // }
    var geoGpsMap = {
        '1': [127.9688, 45.368],
        '2': [116.4551, 40.2539],
        '3': [109.1162, 34.2004],
        '4': [113.12244, 23.009505],
        '5': [87.9236, 43.5883],
        '6': [91.11, 29.97],
    };
    var geoCoordMap = {
        '台湾': [121.5135, 25.0308],
        '黑龙江': [127.9688, 45.368],
        '内蒙古': [110.3467, 41.4899],
        "吉林": [125.8154, 44.2584],
        '北京市': [116.4551, 40.2539],
        "辽宁": [123.1238, 42.1216],
        "河北": [114.4995, 38.1006],
        "天津": [117.4219, 39.4189],
        "山西": [112.3352, 37.9413],
        "陕西": [109.1162, 34.2004],
        "甘肃": [103.5901, 36.3043],
        "宁夏": [106.3586, 38.1775],
        "青海": [101.4038, 36.8207],
        "新疆": [87.9236, 43.5883],
        "西藏": [91.11, 29.97],
        "四川": [103.9526, 30.7617],
        "重庆": [108.384366, 30.439702],
        "山东": [117.1582, 36.8701],
        "河南": [113.4668, 34.6234],
        "江苏": [118.8062, 31.9208],
        "安徽": [117.29, 32.0581],
        "湖北": [114.3896, 30.6628],
        "浙江": [119.5313, 29.8773],
        "福建": [119.4543, 25.9222],
        "江西": [116.0046, 28.6633],
        "湖南": [113.0823, 28.2568],
        "贵州": [106.6992, 26.7682],
        "云南": [102.9199, 25.4663],
        "广东": [113.12244, 23.009505],
        "广西": [108.479, 23.1152],
        "海南": [110.3893, 19.8516],
        '上海': [121.4648, 31.2891],

    };

    var colors = [
        ["#1DE9B6", "#F46E36", "#04B9FF", "#5DBD32", "#FFC809", "#FB95D5", "#BDA29A", "#6E7074", "#546570", "#C4CCD3"],
        ["#37A2DA", "#67E0E3", "#32C5E9", "#9FE6B8", "#FFDB5C", "#FF9F7F", "#FB7293", "#E062AE", "#E690D1", "#E7BCF3", "#9D96F5", "#8378EA", "#8378EA"],
        ["#DD6B66", "#759AA0", "#E69D87", "#8DC1A9", "#EA7E53", "#EEDD78", "#73A373", "#73B9BC", "#7289AB", "#91CA8C", "#F49F42"],
    ];
    var colorIndex = 0;
    $(function () {
        // var geoCoordMap = {
        //     '郑州': [113.64964385, 34.7566100641],
        //     '开封': [114.351642118, 34.8018541758],
        //     '洛阳': [112.447524769, 34.6573678177],
        //     '平顶山': [113.300848978, 33.7453014565],
        //     '安阳': [114.351806508, 36.1102667222],
        //     '鹤壁': [114.297769838, 35.7554258742],
        //     '新乡': [113.912690161, 35.3072575577],
        //     '焦作': [113.211835885, 35.234607555],
        //     '濮阳': [115.026627441, 35.7532978882],
        //     '漯河': [114.0460614, 33.5762786885],
        //     '三门峡': [111.181262093, 34.7833199411],
        //     '南阳': [112.542841901, 33.0114195691],
        //     "商丘": [115.641885688, 34.4385886402],
        //     '信阳': [114.085490993, 32.1285823075],
        //     '周口': [114.654101942, 33.6237408181],
        //     '许昌': [113.83531246, 34.0267395887],
        //     '驻马店': [114.049153547, 32.9831581541]
        // };

        var year = ["2017", "2018", "2019", "2020", "2021"];
        var mapData = [
            [],
            [],
            [],
            [],
            [],
            []
        ];

        /*柱子Y名称*/
        var categoryData = [];
        var barData = [];
        for (var key in geoCoordMap) {
            categoryData.push(key);
            mapData[0].push({
                "year": '2017',
                "name": key,
                "value": randomNum(100, 300)
            });
            mapData[1].push({
                "year": '2018',
                "name": key,
                "value": randomNum(100, 300)
            });
            mapData[2].push({
                "year": '2019',
                "name": key,
                "value": randomNum(100, 300)
            });
            mapData[3].push({
                "year": '2020',
                "name": key,
                "value": randomNum(100, 300)
            });
            mapData[4].push({
                "year": '2021',
                "name": key,
                "value": randomNum(100, 300)
            });

        }
        for (var i = 0; i < mapData.length; i++) {
            barData.push([]);
            for (var j = 0; j < mapData[i].length; j++) {
                barData[i].push(mapData[i][j].value)
            }
        }
        $.getJSON(uploadedDataURL, function (geoJson) {

            echarts.registerMap('china', geoJson);
            var convertData = function (data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = geoCoordMap[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        });
                    }
                }
                return res;
            };

            var convertToLineData = function (data, gps) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    var fromCoord = geoCoordMap[dataItem.name];
                    debugger;
                    var toCoord = gps; //郑州
                    //  var toCoord = geoGps[Math.random()*3]; 
                    if (fromCoord && toCoord) {
                        res.push([{
                            coord: fromCoord,
                            value: dataItem.value
                        }, {
                            coord: toCoord,
                        }]);
                    }
                }
                return res;
            };

            optionMap = {
                timeline: {
                    data: year,
                    axisType: 'category',
                    autoPlay: true,
                    playInterval: 3000,
                    left: '10%',
                    right: '10%',
                    bottom: '3%',
                    width: '80%',
                    //  height: null,
                    label: {
                        normal: {
                            textStyle: {
                                color: '#ddd'
                            }
                        },
                        emphasis: {
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    symbolSize: 10,
                    lineStyle: {
                        color: '#555'
                    },
                    checkpointStyle: {
                        borderColor: '#777',
                        borderWidth: 2
                    },
                    controlStyle: {
                        showNextBtn: true,
                        showPrevBtn: true,
                        normal: {
                            color: '#666',
                            borderColor: '#666'
                        },
                        emphasis: {
                            color: '#aaa',
                            borderColor: '#aaa'
                        }
                    },

                },
                baseOption: {
                    animation: true,
                    animationDuration: 1000,
                    animationEasing: 'cubicInOut',
                    animationDurationUpdate: 1000,
                    animationEasingUpdate: 'cubicInOut',
                    grid: {
                        right: '1%',
                        top: '15%',
                        bottom: '10%',
                        width: '20%'
                    },
                    tooltip: {
                        trigger: 'axis', // hover触发器
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                            shadowStyle: {
                                color: 'rgba(150,150,150,0.1)' //hover颜色
                            }
                        }
                    },
                    geo: {
                        show: true,
                        map: 'china',
                        roam: true,
                        zoom: 1,
                        center: [113.83531246, 34.0267395887],
                        label: {
                            emphasis: {
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderColor: 'rgba(147, 235, 248, 1)',
                                borderWidth: 1,
                                areaColor: {
                                    type: 'radial',
                                    x: 0.5,
                                    y: 0.5,
                                    r: 0.8,
                                    colorStops: [{
                                        offset: 0,
                                        color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                                    }],
                                    globalCoord: false // 缺省为 false
                                },
                                shadowColor: 'rgba(128, 217, 248, 1)',
                                // shadowColor: 'rgba(255, 255, 255, 1)',
                                shadowOffsetX: -2,
                                shadowOffsetY: 2,
                                shadowBlur: 10
                            },
                            emphasis: {
                                areaColor: '#389BB7',
                                borderWidth: 0
                            }
                        }
                    },
                },
                options: []

            };
            for (var n = 0; n < year.length; n++) {
                optionMap.options.push({
                    backgroundColor: '',
                    title: [{
                            /* text: '地图',
                             subtext: '内部数据请勿外传',
                             left: 'center',
                             textStyle: {
                                 color: '#fff'
                             }*/
                        },
                        {
                            id: 'statistic',
                            text: year[n] + "年数据统计情况",
                            left: 'center',
                            top: '5%',
                            textStyle: {
                                color: '#fff',
                                fontSize: 25,
                            }
                        }
                    ],
                    xAxis: {
                        type: 'value',
                        scale: true,
                        position: 'top',
                        min: 0,
                        boundaryGap: false,
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            margin: 2,
                            textStyle: {
                                color: '#aaa'
                            }
                        },
                    },
                    yAxis: {
                        type: 'category',
                        //  name: 'TOP 20',
                        nameGap: 16,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#ddd'
                            }
                        },
                        axisTick: {
                            show: false,
                            lineStyle: {
                                color: '#ddd'
                            }
                        },
                        axisLabel: {
                            interval: 0,
                            textStyle: {
                                color: '#ddd'
                            }
                        },
                        data: categoryData
                    },
                    series: [
                        //未知作用
                        {
                            //文字和标志
                            name: 'light',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            data: convertData(mapData[n]),
                            symbolSize: function (val) {
                                return val[2] / 10;
                            },
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: true
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: colors[colorIndex][n]
                                }
                            }
                        },
                        //地图？
                        {
                            type: 'map',
                            map: 'china',
                            geoIndex: 0,
                            aspectScale: 0.75, //长宽比
                            showLegendSymbol: false, // 存在legend时显示
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                }
                            },
                            roam: true,
                            itemStyle: {
                                normal: {
                                    areaColor: '#031525',
                                    borderColor: '#FFFFFF',
                                },
                                emphasis: {
                                    areaColor: '#2B91B7'
                                }
                            },
                            animation: false,
                            data: mapData
                        },
                        //地图点的动画效果
                        {
                            //  name: 'Top 5',
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            data: convertData(mapData[n].sort(function (a, b) {
                                return b.value - a.value;
                            }).slice(0, 20)),
                            symbolSize: function (val) {
                                return val[2] / 10;
                            },
                            showEffectOn: 'render',
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                            hoverAnimation: true,
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: true
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: colors[colorIndex][n],
                                    shadowBlur: 10,
                                    shadowColor: colors[colorIndex][n]
                                }
                            },
                            zlevel: 1
                        },
                        //地图线的动画效果
                        {
                            type: 'lines',
                            zlevel: 2,
                            effect: {
                                show: true,
                                period: 4, //箭头指向速度，值越小速度越快
                                trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                                symbol: 'arrow', //箭头图标
                                symbolSize: 3, //图标大小
                            },
                            lineStyle: {
                                normal: {
                                    color: colors[colorIndex][n],
                                    width: 0.1, //尾迹线条宽度
                                    opacity: 0.5, //尾迹线条透明度
                                    curveness: .3 //尾迹线条曲直度
                                }
                            },
                            data: convertToLineData(mapData[n], geoGpsMap[Math.ceil(Math.random() * 6)])
                        },
                        //柱状图
                        {
                            zlevel: 1.5,
                            type: 'bar',
                            symbol: 'none',
                            itemStyle: {
                                normal: {
                                    color: colors[colorIndex][n]
                                }
                            },
                            data: barData[n]
                        }
                    ]
                })
            }
            myChart.setOption(optionMap);
        });
    });


    function randomNum(minNum, maxNum) {
        switch (arguments.length) {
            case 1:
                return parseInt(Math.random() * minNum + 1, 10);
                break;
            case 2:
                return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                break;
            default:
                return 0;
                break;
        }
    }
    // myChart.setOption(option);
    // window.addEventListener("resize", function () {
    //     myChart.resize();
    // });
})();

//5  //bar1
(function () {
    var myChart = echarts.init(document.querySelector(".bar1 .chart"));
    var option = {
        backgroundColor: '',
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '2%',
            right: '4%',
            bottom: '14%',
            top: '16%',
            containLabel: true
        },
        legend: {
            data: ['1', '2', '3'],
            right: 10,
            top: 12,
            textStyle: {
                color: "#fff"
            },
            itemWidth: 12,
            itemHeight: 10,
            // itemGap: 35
        },
        xAxis: {
            type: 'category',
            data: ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'],
            axisLine: {
                lineStyle: {
                    color: 'white'

                }
            },
            axisLabel: {
                // interval: 0,
                // rotate: 40,
                textStyle: {
                    fontFamily: 'Microsoft YaHei'
                }
            },
        },

        yAxis: {
            type: 'value',
            max: '12000',
            axisLine: {
                show: false,
                lineStyle: {
                    color: 'white'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(255,255,255,0.3)'
                }
            },
            axisLabel: {}
        },
        "dataZoom": [{
            "show": true,
            "height": 12,
            "xAxisIndex": [
                0
            ],
            bottom: '8%',
            "start": 10,
            "end": 90,
            handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '110%',
            handleStyle: {
                color: "#d3dee5",

            },
            textStyle: {
                color: "#fff"
            },
            borderColor: "#90979c"
        }, {
            "type": "inside",
            "show": true,
            "height": 15,
            "start": 1,
            "end": 35
        }],
        series: [{
                name: '1',
                type: 'bar',
                barWidth: '15%',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#fccb05'
                        }, {
                            offset: 1,
                            color: '#f5804d'
                        }]),
                        barBorderRadius: 12,
                    },
                },
                data: [4000, 4000, 3000, 3000, 3000, 4000, 4000, 4000, 3000]
            },
            {
                name: '2',
                type: 'bar',
                barWidth: '15%',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#8bd46e'
                        }, {
                            offset: 1,
                            color: '#09bcb7'
                        }]),
                        barBorderRadius: 11,
                    }

                },
                data: [4000, 5000, 5000, 5000, 5000, 4000, 4000, 5000, 5000]
            },
            {
                name: '3',
                type: 'bar',
                barWidth: '15%',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#248ff7'
                        }, {
                            offset: 1,
                            color: '#6851f1'
                        }]),
                        barBorderRadius: 11,
                    }
                },
                data: [4000, 6000, 7000, 7000, 10000, 4000, 4000, 6000, 7000]
            }
        ]
    };

    var app = {
        currentIndex: -1,
    };
    setInterval(function () {
        var dataLen = option.series[0].data.length;

        // 取消之前高亮的图形
        myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: app.currentIndex
        });
        app.currentIndex = (app.currentIndex + 1) % dataLen;
        //console.log(app.currentIndex);
        // 高亮当前图形
        myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: app.currentIndex,
        });
        // 显示 tooltip
        myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: app.currentIndex
        });


    }, 1000);

    myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
})();
// // 6  pie2
(function () {
    var myChart = echarts.init(document.querySelector(".pie2 .chart"));

    var fontColor = '#fff';
    var data = [{
        "name": "理综",
        "value": 280
    }, {
        "name": "文综",
        "value": 231
    }, {
        "name": "语文",
        "value": 121
    }, {
        "name": "数学",
        "value": 65
    }, {
        "name": "外语",
        "value": 102
    }, {
        "name": "艺术体育",
        "value": 75
    }, ]
   
   
    option = {
        color: ['#bf19ff', '#854cff', '#5f45ff', '#02cdff', '#314976', '#f9e264', '#f47a75', '#009db2', '#024b51- 0780cf', '#765005'],
        backgroundColor: '',
        timeline: {
            axisType: 'category',
            autoPlay: true,
            show: false,
            playInterval: 2000,
            data: data,

        },
        title: {
            text: '',
            subtext: '',           
            textStyle: {
                color: '#f2f2f2',
                fontSize: 25,
            },
            subtextStyle: {
               
                fontSize: 15,
                color: ['#ff9d19']
            },
            x: 'center',
            y: '36%',
        },
        grid: {
            bottom: '10%',
            left: '20%',
            right: '0'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}<br/> {c}分/均  ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 8,
            textStyle: {
                color: '#f2f2f2',
                fontSize: 12,
   
            },
            icon: 'roundRect',
            data: data,
        },
        series: [
            // 主要展示层的
            {
                radius: ['40%', '90%'],
                center: ['50%', '50%'],
                type: 'pie',
                // label: {
                //     position: 'inner',
                //     formatter: '{b}：{c}亿元',
                // },
                labelLine: {
                    color:'black',
                    normal: {
                        show: false,
                        length:0,
                        length2: 10000,
                        
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: data,
   
            },
            // 边框的设置
            {
                radius: ['45%', '50%'],
                center: ['50%', '50%'],
                type: 'pie',
                // label: {
                //     normal: {
                //         show: false
                //     },
                //     emphasis: {
                //         show: false
                //     }
                // },
                labelLine: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                animation: false,
                tooltip: {
                    show: false
                },
                data: [{
                    value: 1,
                    itemStyle: {
                        color: "rgba(250,250,250,0.5)",
                    },
                }],
            }, {
                name: '外边框',
                type: 'pie',
                clockWise: true, //顺时加载
                hoverAnimation: false, //鼠标移入变大
                center: ['50%', '50%'],
                radius: ['100%', '100%'],
                label: {
                    normal: {
                        show: false
                    }
                },
                data: [{
                    value: 9,
                    name: '',
                    itemStyle: {
                        normal: {
                            borderWidth: 2,
                            borderColor: '#0b5263'
                        }
                    }
                }]
            },
        ]
    };


    myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
})();
// 7  line()
(function () {
    var myChart = echarts.init(document.querySelector(""));
    option = {
        baseOption: {
            backgroundColor:'',
            timeline: {
                axisType: 'category',
                autoPlay: true,
                show: false,
                playInterval: 3000,
                data: ['1', '2', '3'],
    
            },
            title: {
                top: 30,
                right: 20,
                textStyle: {
                    color: '#eee'
                }
            },
            tooltip:{
                backgroundColor:'rgba(255,255,255,0.75)',
            },
          
            legend: {
                orient: 'vertical',
                symbol: '',
                top: 0,
                left:0,
                data: ['1', '2', '3'],
                itemGap: 10,
                textStyle: {
                    color: '#fff',
                    fontSize: 12
                },
    
            },
            radar: {
               
                startAngle: 60,
                indicator: [{
                        name: '运算求解',
                        max: 100
                    },
                    {
                        name: '推理运算',
                        max: 100
                    },
                    {
                        name: '数学建模',
                        max: 100
                    },
                    {
                        name: '空间想象',
                        max: 100
                    },
                    {
                        name: '数据处理',
                        max: 100
                    },
                    {
                        name: '数学表达',
                        max: 100
                    }
                ],
                shape: 'polygon',
                splitNumber: 5,
                name: {
                    textStyle: {
                        fontFamily: 'sc',
                        fontSize: 12,
                        color: '#fff'
                    },
                },
    
                splitLine: {
                    lineStyle: {
                        color: 'rgba(109, 205, 230, 0.5)'
                    }
                },
                splitArea: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(238, 197, 102, 0.5)'
                    }
                }
            },
            series: [{
                    name: '1',
                    type: 'radar',
                    itemStyle: {
                        color: '#6DCDE6'
                    },
                    areaStyle: {
                        opacity: .4,
                        color: {
                            type: 'radial',
                            x: 0.5,
                            y: 0.5,
                            r: 0.5,
                            colorStops: [{
                                offset: 0,
                                color: '#38A0D6' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#61C3E2' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        }
                    }
                },
                {
                    name: '2',
                    type: 'radar',
                    itemStyle: {
                        color: '#FFA53C'
                    },
                    areaStyle: {
                        opacity: .4,
                        color: {
                            type: 'radial',
                            x: 0.5,
                            y: 0.5,
                            r: 0.5,
                            colorStops: [{
                                offset: 0,
                                color: '#FF457E' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#FFA53C' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        }
                    }
                },
                {
                    name: '3',
                    type: 'radar',
                    itemStyle: {
                        color: '#E23AF5'
                    },
                    areaStyle: {
                        opacity: .4,
                        color: {
                            type: 'radial',
                            x: 0.5,
                            y: 0.5,
                            r: 0.5,
                            colorStops: [{
                                offset: 0,
                                color: '#BB42EF' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#E23AF5' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        }
                    }
                }
            ]
        },
        options: [{
            title: {
                text: '1'
            },
            radar: {
    
                indicator: [{
                        name: '运算求解',
                        max: 100
                    },
                    {
                        name: '推理运算',
                        max: 100
                    },
                    {
                        name: '数学建模',
                        max: 100
                    },
                    {
                        name: '空间想象',
                        max: 100
                    },
                    {
                        name: '数据处理',
                        max: 100
                    },
                    {
                        name: '数学表达',
                        max: 100
                    }
                ]
            },
            series: [{
                data: [
                    [55, 91, 56, 80, 48, 62, 22]
                ]
            }, {
                data: [
                    [26, 37, 27, 73, 27, 13, 41]
                ]
            }, {
                data: [
                    [91, 45, 95, 82, 34, 23, 71]
                ]
            }]
        }, {
            title: {
                text: '2'
            },
            radar: {
                startAngle: 0,
                indicator: [{
                        name: '倾听',
                        max: 100
                    },
                    {
                        name: '发言',
                        max: 100
                    },
                    {
                        name: '朗读',
                        max: 100
                    },
                    {
                        name: '合作',
                        max: 100
                    }
    
                ],
            },
            series: [{
                data: [
                    [55, 91, 56, 80]
                ]
            }, {
                data: [
                    [26, 87, 57, 63]
                ]
            }, {
                data: [
                    [91, 75, 95, 82]
                ]
            }]
        }, {
            title: {
                text: "3"
            },
            radar: {
                startAngle: 0,
                indicator: [{
                        name: '记录单',
                        max: 100
                    },
                    {
                        name: '分析结论',
                        max: 100
                    },
                    {
                        name: '实验方案',
                        max: 100
                    },
                    {
                        name: '卫生',
                        max: 100
                    }
                ],
            },
            series: [{
                data: [
                    [55, 91, 56, 80]
                ]
            }, {
                data: [
                    [26, 67, 97, 73]
                ]
            }, {
                data: [
                    [91, 65, 95, 82]
                ]
            }]
        }]
    
    };


    myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
})();