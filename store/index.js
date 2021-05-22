/* //almacenamiento central
export const state = () =>({
_counter : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNDNmZDA4Y2UwOGEyNGIyOGY1ZTZiYSIsInVzdWFyaW8iOiJIZXJuYW5kZXoiLCJjb3JyZW8iOiJ1c3VhcmlvZGVtb0BkZGVtby5jb20iLCJpYXQiOjE2MTUyMjI5MTJ9.1VwsxO4gRzfaiYlZugUfS-bh2DGDGncWdutdDDDQUkI'
});

///getters o accesos   normalmente se llaman desde las propoiedades de los componentes 
export const getters = {
    getCounter(state){
        return state._counter
    }
}


//acciones  estas acciones o metodos sirven para modificar o llamar a las mutaciones
//a diferencias de las mutaciones pueden ser asincronas (llamadas a api)
export const actions = {
        obtenerCursos: async function ({commit}){
            const data = await fetch('cursos.json');
            const cursos = await data.json();
            commit('llenarCursos', cursos)
}

}

//mutadores = mutar o modificar el estate o almacenamiento 
export const mutations = {
    increment(state,guardar){
        state._counter = guardar;
    }
}*/


export const state = () =>({
    token : null
    });
export const mutations = {
    saveToken(state, token) {
        state.token = token;
    }
}
export const getters = {
    getCounter(state){
        return state.token
    }
}