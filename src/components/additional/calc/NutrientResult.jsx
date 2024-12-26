import Card from "../../common/Card";
import ReactApexChart from "react-apexcharts";

const NutrientResult = (props) => {

    const {petData, nutrientData} = props;

    const getEliminateWater = (value, water) => {
        const result = value / (1 - water/100);
        return Math.round(result * 100) / 100;
    }

    const getNutrientAnalysis = (age) => {
        const nutrient = nutrientData;
        const waterIndex = nutrient.findIndex(nu => nu.name === "수분");
        const water = nutrient[waterIndex]?.value || 0;
        const isDry = petData?.isDry;
        
        const nutrients = petData?.species === "고양이" ? 
            ["조단백질", "조지방", "칼슘", "인", "타우린"] : ["조단백질", "조지방", "칼슘", "인"]

        let results = [];
        
        if (!age) return "나이를 작성해주세요";
    
        nutrients.forEach(name => {
            const index = nutrient.findIndex(nu => nu.name === name);
            const value = nutrient[index]?.value || 0;
            const convert = getEliminateWater(value, water);
            
            let targetValue;
            let isTargetMet = false;
            let maxValue = null;
    
            if (petData?.species === "고양이") {
                switch(name) {
                    case "조단백질":
                        targetValue = age === "1살미만" ? 30.0 : 26.0;
                        maxValue = null;
                        break;
                    case "조지방":
                        targetValue = 9.0;
                        maxValue = null;
                        break;
                    case "칼슘":
                        targetValue = age === "1살미만" ? 1.0 : 0.6;
                        maxValue = null;
                        break;
                    case "인":
                        targetValue = age === "1살미만" ? 0.8 : 0.5;
                        maxValue = null;
                        break;
                    case "타우린":
                        targetValue = isDry ? 0.1 : 0.2;
                        maxValue = null;
                        break;
                }
            } else {
                // 강아지
                switch(name) {
                    case "조단백질":
                        targetValue = age === "1살미만" ? 22.5 : 18.0;
                        maxValue = null; // 최대치 없음
                        break;
                    case "조지방":
                        targetValue = age === "1살미만" ? 8.5 : 5.5;
                        maxValue = null; // 최대치 없음
                        break;
                    case "칼슘":
                        targetValue = age === "1살미만" ? 1.2 : 0.5;
                        if (petData?.isLarge && age === "1살미만") maxValue = 1.8;
                        else maxValue = 2.5;
                        break;
                    case "인":
                        targetValue = age === "1살미만" ? 1.0 : 0.4;
                        maxValue = 1.6;
                        break;
                }
            }
            
            if (maxValue !== null) {
                isTargetMet = convert >= targetValue && convert < maxValue
            } else {
                isTargetMet = convert >= targetValue;   
            }
            
            results.push({
                name: name,
                convert: convert,
                isTargetMet: isTargetMet,
                targetValue: targetValue || 0,
                maxValue: maxValue
            });
        });
        
        return results;
    };

    // 칼슘 인 비율 
    const getRate = () => {
        const nutrientResults = getNutrientAnalysis(petData?.age);
        const calciumIndex = nutrientResults.findIndex(result => result.name === "칼슘");
        const phosphorusIndex = nutrientResults.findIndex(result => result.name === "인");
    
        const calcium = nutrientResults[calciumIndex].convert;
        const phosphorus = nutrientResults[phosphorusIndex].convert;
    
        const rate = phosphorus !== 0 ? calcium / phosphorus : 0;
        let isTargetMet = false;
        let targetValue = 0;
        let maxValue = null;
    
        switch(petData?.species) {
            case "고양이":
                switch(petData?.age) {
                    case "1살미만":
                        targetValue = 1/0.8;
                        isTargetMet = rate >= targetValue;
                        break;
                    case "성견/성묘":
                        targetValue = 1/0.83;
                        isTargetMet = rate >= targetValue;
                        break;
                    default:
                        return { error: "아기 고양이인지 성묘인지 표시해주세요" };
                }
                break;
            case "강아지":
                switch(petData?.age) {
                    case "1살미만":
                    case "성견/성묘":
                        targetValue = 1;
                        maxValue = 2;
                        isTargetMet = rate >= targetValue && rate < maxValue;
                        break;
                    default:
                        return { error: "아기 강아지인지 성견인지 표시해주세요" };
                }
                break;
            default:
                return { error: "강아지인지 고양이인지 표시해주세요" };
        }
    
        return {
            name: "칼슘:인 비율",
            convert: parseFloat(rate.toFixed(2)),
            isTargetMet: isTargetMet,
            targetValue: parseFloat(targetValue.toFixed(2)),
            maxValue: maxValue ? parseFloat(maxValue.toFixed(2)) : null
        };
    };

    const results = getNutrientAnalysis(petData?.age);

    const macroOptions = {
        chart: {
            height: 250,
            type: 'bar',
            toolbar: { show: false }
        },
        series: [{
            name: '대량영양소',
            data: [
                {
                    x: '조단백질',
                    y: results.find(item => item.name === "조단백질")?.convert,
                    goals: [{
                        name: '기준치',
                        value: results.find(item => item.name === "조단백질")?.targetValue,
                        strokeHeight: 30,
                        strokeColor: '#FEB019'
                    }]
                },
                {
                    x: '조지방',
                    y: results.find(item => item.name === "조지방")?.convert,
                    goals: [{
                        name: '기준치',
                        value: results.find(item => item.name === "조지방")?.targetValue,
                        strokeHeight: 30,
                        strokeColor: '#FEB019'
                    }]
                }
            ]
        }],
        plotOptions: {
            bar: {
              horizontal: true,
            },
            fill: {
                colors: ['#FF0000']     
            }
        },
        yaxis: {
            min: 0,
            max: 35
        },
        dataLabels: {
            enabled: true,
            formatter: (val) => val.toFixed(1) + '%'
        }
    };

    const microOptions = {
        chart: {
            height: 250,
            type: 'bar',
            toolbar: { show: false }
        },
        series: [{
            name: '미량영양소',
            data: [
                {
                    x: '칼슘',
                    y: results.find(item => item.name === "칼슘")?.convert,
                    goals: [
                        {
                          name: '기준치',
                          value: results.find(item => item.name === "칼슘")?.targetValue,
                          strokeHeight: 20,
                          strokeColor: '#FEB019'
                        },
                        ...(results.find(item => item.name === "칼슘")?.maxValue !== null ? [{
                          name: '최대치',
                          value: results.find(item => item.name === "칼슘")?.maxValue,
                          strokeHeight: 20,
                          strokeColor: '#FF4560'
                        }] : [])
                      ]
                    },
                    {
                        x: '인',
                        y: results.find(item => item.name === "인")?.convert,
                        goals: [
                        {
                            name: '기준치',
                            value: results.find(item => item.name === "인")?.targetValue,
                            strokeHeight: 20,
                            strokeColor: '#FEB019'
                        },
                        ...(results.find(item => item.name === "인")?.maxValue !== null ? [{
                            name: '최대치',
                            value: results.find(item => item.name === "인")?.maxValue,
                            strokeHeight: 20,
                            strokeColor: '#FF4560'
                        }] : [])
                        ]
                    },
            ...(petData.species === "고양이" ? [{
                    x: '타우린',
                    y: results.find(item => item.name === "타우린")?.convert,
                    goals: [
                      { name: '기준치', value: results.find(item => item.name === "타우린")?.targetValue, strokeHeight: 20, strokeColor: '#FEB019' }
                    ]
                }] : [])
            ]
        }],
        plotOptions: {
            bar: {
              horizontal: true,
            }
        },
        colors: ['#00E396'],
        yaxis: {
            min: 0,
            max: 2
        },
        dataLabels: {
            enabled: true,
            formatter: (val) => val.toFixed(1) + '%'
        }
    };

    return (
        <Card className="default-card nutrient-result">
                {/* 기존 결과 표시 부분 */}
                <Card style={{ marginBottom: '20px'}}>
                    <ReactApexChart 
                        options={macroOptions} 
                        series={macroOptions.series} 
                        type="bar" 
                        height={200} 
                    />
                </Card>
                <Card>
                    <ReactApexChart 
                        options={microOptions} 
                        series={microOptions.series} 
                        type="bar" 
                        height={200} 
                    />
                </Card>
                <Card>
                    <table>
                        <thead>
                            <tr>
                                <th>성분</th>
                                <th>기준치</th>
                                <th>입력값</th>
                                <th>평가</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getNutrientAnalysis(petData?.age).map((result, index) => (
                                <tr key={index}>
                                    <td>{result.name}</td>
                                    <td>{result.targetValue}</td>
                                    <td>{result.convert}</td>
                                    <td className={!result.isTargetMet && "red-td"}>{result.isTargetMet ? "충족" : "미충족"}</td>
                                </tr>
                            ))}
                            <tr key={10}>
                                <td>{getRate().name}</td>
                                <td>{getRate().targetValue}</td>
                                <td>{getRate().convert}</td>
                                <td className={!getRate().isTargetMet && "red-td"}>{getRate().isTargetMet ? "충족" : "미충족"}</td> 
                            </tr>
                        </tbody>
                    </table>
                </Card>        
        </Card>
    )
}

export default NutrientResult;