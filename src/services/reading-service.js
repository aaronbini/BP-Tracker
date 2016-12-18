readingService.$inject = ['tokenService', '$http', 'apiUrl'];

export default function readingService (tokenService, $http, apiUrl) {

  return {
    get () {},

    //TODO: combine getToday and todayCompleted
    getToday (userId) {
      return $http.get(`${apiUrl}/readings/${userId}/todayReading`)
        .then(response => response.data);
    },

    todayCompleted (userId) {
      return $http.get(`${apiUrl}/readings/${userId}/todayCompleted`)
        .then(response => response.data);
    },

    //refactor server-side so this is not a unique endpoint
    getInRange (userId, range) {
      return $http.post(`${apiUrl}/readings/dateRange/${userId}`, range)
        .then(response => response.data);
    },

    //re-factor to send token only, and use ensureAuth middleware on server-side to add user to the request
    getByUser (userId) {
      return $http.get(`${apiUrl}/readings/byUser/${userId}`)
        .then(response => response.data);
    },

    getMedian (readings) {
      if (readings.length < 3) return false;
      const half = Math.floor(readings.length / 2);
      let sysSort = readings.sort((a,b) => {
        return a.systolic < b.systolic;
      });
      let diaSort = readings.sort((a,b) => {
        return a.diastolic < b.diastolic;
      });
      return {sys: sysSort[half].systolic, dia: diaSort[half].diastolic};
    },

    getMean (readings) {
      if (readings < 1) return false;
      let sysTotal = 0;
      let diaTotal = 0;
      readings.forEach(e => {
        sysTotal += e.systolic;
        diaTotal += e.diastolic;
      });
      return {sys: Math.ceil(sysTotal / readings.length), dia: Math.ceil(diaTotal / readings.length)};
    },

    postNew (userId, reading) {
      return $http.post(`${apiUrl}/readings/${userId}`, reading)
        .then(response => response.data);
    }
  };
}
