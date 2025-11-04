import { defineStore } from 'pinia'
import {ref, computed, watch} from 'vue'
import {IForm} from "@/typeModules/module";

export const useStore = defineStore("id",()=>{
    const tasks = ref<IForm[]>([]);
    const changeFilter = ref("");

    const loadTasks = () => {
        const saved = localStorage.getItem("tasks");
        if (saved) {
            try {
                tasks.value = JSON.parse(saved);
            } catch (error) {
                console.error("Localdan uqishda xatolik", error);
            }
        }
    }
    watch(tasks, (newTasks) => {
        localStorage.setItem("tasks", JSON.stringify(newTasks));
    },{
        deep: true,
        })

    const setFilter = (value: string) => {
        changeFilter.value = value;
    }

    const filteredTasks = computed(() => {
        switch(changeFilter.value) {
            case "todo":
                return tasks.value.filter(task => !task.completed);
            case "done":
                return tasks.value.filter(task => task.completed);
            default:
                return tasks.value;
        }
    });

    const toggleChecked =  (id: number) => {
        tasks.value = tasks.value.map(task =>
            task.id === id ? {...task, completed: !task.completed} : task
        )
    }

    loadTasks()

    const theme = ref<'sun'| 'moon' >('moon');

    const setTheme = (value: "sun" | "moon") => {
        theme.value = value;

        localStorage.setItem('theme', value);

        if (value === "moon") {
            document.documentElement.classList.add("moon");
        } else {
            document.documentElement.classList.remove("moon");
        }
    }

    const loadTheme = () => {
        const savedTheme = localStorage.getItem('theme') as 'sun' | 'moon' | null;
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            setTheme(theme.value);
        }
    }

    watch(theme, (value) => {

        localStorage.setItem('theme', value)
    })

    loadTheme();

    return {tasks, changeFilter, setFilter, filteredTasks, toggleChecked, theme, setTheme};
})