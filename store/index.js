const state = {
  items: [],
  filterQuery: {
    title: "",
    score: ""
  },
}

const mutations = {

  setFilterQuery(state, filterQuery) {
    state.filterQuery = {...filterQuery}
  },

  setDatabase(state, items) {
    state.items = items
  }
}

const actions = {
  stateSetDatabase({ commit }, val) {
    commit("setDatabase", val)
  } 
}

const getters = {
  filterItems(state) {
    let data = state.items;

    if (!state.filterQuery) {
      return data
    }

    if (state.filterQuery.title) {
      data = data.filter(item => {
        return item.title.includes(state.filterQuery.title)
      })
    }

    if (state.filterQuery.score) {
      data = data.filter(item => {
        return item.score === state.filterQuery.score
      })
      console.log(data)
    }

    return data;
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}