// 뒤에 있는 기능은 앞에 있는 기능이 배포될 때 함께 배포됨
// progresses :: 작업의 진도 
// speeds :: 각 작업의 개발 속도 , 하루에 작업
// 진도율이 95%의 작업 개발 속도가 하루에 4% 라면 배포는 2일뒤에 

function solution(progresses, speeds) {
    var answer = [];
    let remainingwork = []; // 각 프로세스에 남은 작업일 
    let remainingworkdaycount = 0; // 한번에 배포할 수 있는 프로세스 수 
    let remainingworkdaycomparecount = []; // 한번에 배포할 수 있는 프로세스 비교 수 

    progresses.forEach((element, index) => { // 각 프로세스에 해당하는 남은 잔여 일수 추가 
        let remainingworkday = 0; // 작업일수
        while (Number(element) < 100) { // 작업량 100을 채운다면 
            element += Number(speeds[index]);
            remainingworkday++;
        }
        remainingwork.push(remainingworkday);
    });

    remainingwork.forEach((element, index) => { // 남은잔여일수 비교를 통한 한번에 배포가능 여부 판단
        if (index < remainingwork.length) {
            if (index > 0) {

                var maxvalue = remainingworkdaycomparecount.reduce(function (a, b) { // 남은잔여일수 중 최대값 
                    return Math.max(a, b);
                }, 0);

                if (maxvalue >= Number(element)) { // 최대 배포가능 수 여부 
                    remainingworkdaycount++;
                    remainingworkdaycomparecount.push(Number(element));
                    if (index == remainingwork.length - 1) { // 남은잔여일수의 마지막 일 처리 
                        answer.push(remainingworkdaycount);
                    }
                }
                else {
                    answer.push(remainingworkdaycount);
                    remainingworkdaycount = 1;
                    remainingworkdaycomparecount = [element];
                    if (index == remainingwork.length - 1) {
                        answer.push(remainingworkdaycount);
                    }
                }
            } else { // index가 0 일 때 
                remainingworkdaycomparecount.push(Number(element));
                remainingworkdaycount++
            }
        }
    });
    return answer;
}


// console.log(solution([99, 99, 99], [1, 1, 1]))
// testcase 1,2,4,5 --> 정답 :: [3] 
