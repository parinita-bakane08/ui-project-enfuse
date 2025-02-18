function getTodoList () {
    const loader = document.getElementById('loader');
    loader.style.display = 'block';
    setTimeout(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(data => {
        const userTodos = data.reduce((acc, todo) => {
            if (!acc[todo.userId - 1]) {
                acc[todo.userId - 1] = [];
            }
            acc[todo.userId - 1].push(todo);
            return acc;
        }, Array.from({ length: 10 }, () => []));


        const accordionContainer = document.getElementById('accordion-container');

        userTodos.forEach((todos, index) => {
            const accordionButton = document.createElement('button');
            accordionButton.className = 'accordion';
            accordionButton.innerText = `User ${index + 1}`;

            const panelDiv = document.createElement('div');
            panelDiv.classList.add('panel','container-'+index);

            const additionalDiv = document.createElement('div');
            additionalDiv.classList.add('panel-child');
            panelDiv.appendChild(additionalDiv);

            todos.forEach(todo => {
                const todoItem = document.createElement('div');
                todoItem.classList.add('todochild', 'child-'+todo.id);
                todoItem.innerHTML = `
                    <p><strong>ID:</strong> ${todo.id}</p>
                    <p><strong>Title:</strong> ${todo.title}</p>
                    <p><strong>Completed:</strong> <input type="checkbox" ${todo.completed ? 'checked' : ''}></p>
                 `;
                 additionalDiv.appendChild(todoItem);
            });

            accordionButton.addEventListener('click', function() {
                const currentlyActiveAccordion = document.querySelector('.accordion.active');
                if (currentlyActiveAccordion && currentlyActiveAccordion !== this) {
                    currentlyActiveAccordion.classList.remove('active');
                    currentlyActiveAccordion.nextElementSibling.style.display = 'none';
                }
                this.classList.toggle('active');
                const panel = this.nextElementSibling;
                panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
            });

            accordionContainer.appendChild(accordionButton);
            accordionContainer.appendChild(panelDiv);
        });
        loader.style.display = 'none';
    })
    .catch(error => {
        console.error('Error:', error);
        loader.style.display = 'none';
    });
}, 2000);
    const elements = document.getElementById('todo-head');
    elements.style.display = 'none';

}