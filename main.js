// /**
// array
//  */


// let ages = [25,30,35];
// console.log(ages); //[25,30,35]
// console.log(ages[1]); //30

// //แทนที่
// ages = [40,45,50];
// console.log(ages);

// //ต่ออาเรย์
// ages.push(55)

// console.log(ages); 

// //ความยาวของอาเรย์
// console.log(ages.length);//4

// //ลบสมาชิกตัวสุดท้าย
// ages.pop();
// console.log(ages);

// if (ages.includes(45)) {
//     console.log("พบ 45 ในอาร์เรย์");
// }

// let numbers = [90,60,80,40,50];
// numbers.sort(); //เรียงจากน้อยไปหามาก
// console.log(numbers)

// let names = ["John","Jane","Doe"];
// names.push("Smith");
// console.log(names);
// console.log(names.length);

// for (let i = 0; i < names.length;i++){
//     console.log(names[i])
// }

// /**
// object
//  */

// let student = [{
//     age: 20,
//     name: "Emma",
//     grade: 'A'
// },{
//     age: 20,
//     name: "Liam",
//     grade: 'B'
// }];

// for (let i = 0; i< student.length; i++){
//     console.log("Student ",+ (i + 1) + ":")
//     console.log("Name "+ student[i].name)
//     console.log("Age: "+ student[i].age)
//     console.log("Grade: "+ student[i].grade)

// }

// student.push({
//     age: 21,
//     name: "Olivia",
//     grade: 'A'
// });

// console.log(student);

/**
function
 */
// function calculate_grade(score){
//     if (score >= 90){
//         return 'A';
//     }else if (score >= 80){
//         return 'B'
//     }else if (score >= 70){
//         return 'C'
//     }else if (score >= 60){
//         return 'D'
//     }else {
//         return 'F'
//     }
//     return grade;
    
// }
// //เรียกใช้ฟังก์ชัน
// let student_score = 85;
// let student_grade = calculate_grade(student_score);
// console.log("Student's grade is: " + student_grade )

// let score = [10,20,30,40,50];
// for (let i = 0; i < score.length;i++){
//     console.log(`Score at index ${i} is ${score[i]}`)
// }
// score.forEach((s) => {
//     console.log("score",s)
// })

// score = score.map((s) => {
//     return s * 2
// })

// score.forEach((s) => {
//     console.log("New score:",s)
// })

// let score = [10,20,30,40,50];



// for (let index = 0; index < score.length; index++){
//     console.log('score',score[index])
    
// }
// let newScore = score.filter((s) => {
//     if (s >= 30){
//         return true
//     } else {
//         return false
//     }
// })

// newScore.forEach((ns) => {
//     console.log('new score: ',ns)
// })

/**
object + function
 */
// let students = [
//     {
//         name: 'aa',
//         score: '50',
//         grade: 'A'
//     },
//     {
//         name: 'bb',
//         score: '60',
//         grade: 'B'
//     }
// ]

// console.log('Student :',students[0])

// let student = students.find((s) => {
//     if (s.name == "bb"){
//         return true
//     }
// })
// let double_student = students.map((s) => {
//     s.score = s.score * 2
//     return s

// })

// console.log('student:' ,student)
// console.log(double_student)

// let highScore_student = students.filter((s) => {
//     if (s.score >= 110) {
//         return true
//     }
// })

// console.log('highScore_student',highScore_student)