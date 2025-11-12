const ul = document.querySelector('#studentList');

const getData = async () => {
    const response = await fetch ('http://localhost:5000/student/all');
    const data = await response.json();

    return data;
}

getData().then((data) => {
    const student = data.message;
     
    student.forEach(student=> {
        const li = document.createElement('li');
        li.innerText = student.name;

        li.className = 'text-blue-500'

        ul.appendChild(li);
        
    });
    div.appendChild(ul);
})

