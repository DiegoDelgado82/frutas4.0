const taskForm = document.getElementById('taskForm');
const taskTable = document.getElementById('taskTable');
const editForm = document.getElementById('editForm');
const deleteAllBtn = document.getElementById('deleteAllBtn');
const generateImageBtn = document.getElementById('generateImage');

// Obtener la fecha actual en formato dd/mm/aa
function getCurrentDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
}

let tasks = [];
let taskCounter = 1;

// Cargar tareas y contador desde localStorage al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const savedTasks = localStorage.getItem('tasks');
    const savedCounter = localStorage.getItem('taskCounter');

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }

    if (savedCounter) {
        taskCounter = parseInt(savedCounter, 10);
    }
});

// Guardar tareas en localStorage
function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('taskCounter', taskCounter);
}

// Renderizar tareas en la tabla
function renderTasks() {
    taskTable.innerHTML = '';
    headerTable();
    tasks.forEach((task, index) => {
        const row = document.createElement('tr');

        if (task.status === 'Realizada') {
            row.classList.add('table-success');
        } else
        {
            if (task.status === 'Cancelada') {
                row.classList.add('table-danger');
            }
            else
                {
                    if (task.status === 'En progreso') {
                        row.classList.add('table-info');
                    }
                }
        
        }

        row.innerHTML = `
            <td>${task.id}</td>
            <td>${task.description}</td>
            <td>${task.status}</td>
            <td>${task.date}</td>
            <td>
                ${task.status === 'Realizada' || task.status === 'Cancelada' ? '' : `
                    <button class="btn btn-warning btn-sm" onclick="editTask(${index})">Editar</button>
                `}
                <button class="btn btn-danger btn-sm" onclick="deleteTask(${index})">Eliminar</button>
            </td>
        `;
        taskTable.appendChild(row);
    });
}

//agregar encabezado a Tabla

function headerTable() {
    taskTable.innerHTML = '';
        const row = document.createElement('tr');
        row.innerHTML = `
            <th>ID</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Acción</th>
            
        `;
        taskTable.appendChild(row);
 }



// Agregar nueva tarea
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const description = document.getElementById('taskDescription').value;
    const date = getCurrentDate();

    const id = `${taskCounter++}`;
    const status = 'Programado';

    const newTask = { id, description, status, date };
    tasks.push(newTask);
    saveToLocalStorage();
    renderTasks();

    taskForm.reset();
});

// Editar tarea
function editTask(index) {
    const task = tasks[index];

    if (task.status === 'Realizada' || task.status === 'Cancelada') {
        return;
    }

    document.getElementById('editTaskId').value = task.id;
    document.getElementById('editTaskDescription').value = task.description;
    document.getElementById('editTaskStatus').value = task.status;
    document.getElementById('editTaskDate').value = task.date;

    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    editModal.show();

    editForm.onsubmit = (e) => {
        e.preventDefault();

        tasks[index].description = document.getElementById('editTaskDescription').value;
        tasks[index].status = document.getElementById('editTaskStatus').value;
        tasks[index].date = document.getElementById('editTaskDate').value;

        saveToLocalStorage();
        renderTasks();
        editModal.hide();
    };
}

// Eliminar tarea
function deleteTask(index) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará la tarea.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            tasks.splice(index, 1);
            saveToLocalStorage();
            renderTasks();
            Swal.fire('Eliminada', 'La tarea fue eliminada.', 'success');
        }
    });
}

// Eliminar todas las tareas
deleteAllBtn.addEventListener('click', () => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará todas las tareas.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar todas',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            tasks = [];
            saveToLocalStorage();
            renderTasks();
            Swal.fire('Eliminadas', 'Todas las tareas fueron eliminadas.', 'success');
        }
    });
});

// Generar imagen de la lista
generateImageBtn.addEventListener('click', () => {
    const tableElement = document.getElementById('taskTable');
    const buttons = tableElement.getElementsByTagName('button');

    // Ocultar botones
    Array.from(buttons).forEach(button => button.style.display = 'none');

    html2canvas(tableElement).then(canvas => {
        const image = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = image;
        a.download = 'lista_de_tareas.png';
        a.click();

        // Mostrar los botones nuevamente
        Array.from(buttons).forEach(button => button.style.display = '');
    });
});

document.getElementById("showChartBtn").addEventListener("click", () => {
    // Obtener los datos de las tareas desde la tabla
    const rows = document.querySelectorAll("#taskTable tbody tr");
    const taskData = {
      Programado: 0,
      "En progreso": 0,
      Realizada: 0,
      Cancelada: 0,
    };
  
    // Recorrer las filas de la tabla y contar los estados
    let contador=0;
    rows.forEach((row) => {
      const status = row.cells[2].innerText.trim(); // Columna de estado
      if (taskData.hasOwnProperty(status)) {
        taskData[status]++;
      }
    });
  
    // Generar los datos para el gráfico
    const labels = Object.keys(taskData);
    const data = Object.values(taskData);
  
    // Configuración del gráfico
    const chartHtml = `
      <canvas id="taskChart" width="400" height="400"></canvas>
    `;
  
    Swal.fire({
      title: "Estados de las Tareas",
      html: chartHtml,
      showCloseButton: true,
      showConfirmButton: false,
      didOpen: () => {
        const ctx = document.getElementById("taskChart").getContext("2d");
        new Chart(ctx, {
          type: "pie",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Cantidad",
                data: data,
                backgroundColor: [
                  "#007bff", // Programado
                  "#ffc107", // En progreso
                  "#28a745", // Realizada
                  "#dc3545", // Cancelada
                ],
              },
            ],
          },
        });
      },
    });
  });
  