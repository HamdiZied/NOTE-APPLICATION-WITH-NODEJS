var fs = require('fs');

//       function message erreur helps
function help() {
    console.log('node main.js --help \t\t\t\t\t for help')
    console.log('node main.js list \t\t\t\t\t to show the list of data ')
    console.log('node main.js add --title your_title --body your_body \t to add a todo note')
    console.log('node main.js read --title your_title \t\t\t to read a data note')
    console.log('node main.js remove --title your_title \t\t\t to remove a data note')
}
//       function  afficher list 
function list() {
    let fd = fs.readFileSync('data.json','utf-8')
    let todos = JSON.parse(fd) //data recieved become a JavaScript Object
    console.log('printing', todos.length, 'notes')

    for (const todo of todos) {
        console.log('this is your list:- Title:', todo.Title, '\t- Body:', todo.Body)
    }
}
//         function add
function add() {
    let newtodo ={}

    let indexTitle = process.argv.findIndex(el => el === '--title')
    if (indexTitle === -1 || typeof process.argv[indexTitle + 1] === 'undefined'){
        console.log('Missing required argument: --title')
        return
    }
    else newtodo['Title'] = process.argv[indexTitle + 1]

    let indexBody = process.argv.findIndex(el => el === '--body')
    if (indexBody === -1 || typeof process.argv[indexBody + 1] === 'undefined'){
        console.log('Missing required argument: --body')
        return
    }
    else newtodo['Body'] = process.argv[indexBody + 1]

    let todos = JSON.parse(fs.readFileSync('data.json','utf-8'))

    fs.writeFileSync('data.json', JSON.stringify(todos.concat([newtodo])))
}
//             function remove 
function remove() {
    let title=''

    let indexTitle = process.argv.findIndex(el => el === '--title')
    if (indexTitle === -1 || typeof process.argv[indexTitle + 1] === 'undefined'){
        console.log('Missing required argument: --title')
        return
    }
    else title = process.argv[indexTitle + 1]
    let todos = JSON.parse(fs.readFileSync('data.json','utf8')) //convert JSON to object
    let todo = todos.find(x => x.Title === title)
    todos.splice(todos.indexOf(todos.find(x => x.Title === title)), 1);

    fs.writeFileSync('data.json', JSON.stringify(todos))
    console.log('Todo: - Title:', todo.Title, ', - Body:', todo.Body, 'hano sayee tefsa5 irte7 barka ')
}
// function read 
function read() {
    let title = ''

    let indexTitle = process.argv.findIndex(el => el === '--title')
    if (indexTitle === -1 || typeof process.argv[indexTitle + 1] === 'undefined'){
        console.log('Missing required argument: --title')
        return
    }
    else title = process.argv[indexTitle + 1] // node app.js read --title zied => zied (indexTitle + 1)

    let todos = JSON.parse(fs.readFileSync('data.json','utf-8')) //convert JSON into object => todos OBJECT [{Title: react, Body: redux},{Title: moez, Body: amin}]
    let todo = todos.find(x => x.Title === title) //premier element trouvé
    if (todo) console.log('- Title:', todo.Title, '\t- Body:', todo.Body)
    else console.log('Todo not found')
}


//call all function
switch (process.argv[2]) {
    case '--help': help(); break;
    case 'list': list(); break;
    case 'add': add(); break;
    case 'read': read(); break;
    case 'remove': remove(); break;
    default: help(); break;
}

if (process.argv.length < 3) help();