readingService.$inject = ['tokenService', '$http', 'apiUrl'];

export default function readingService (tokenService, $http, apiUrl) {

  return {
    get () {},

    getToday (userId) {
      return $http.get(`${apiUrl}/readings/${userId}/todayReading`)
        .then(response => response.data);
    },

    todayCompleted (userId) {
      return $http.get(`${apiUrl}/readings/${userId}/todayCompleted`)
        .then(response => response.data);
    },

    getInRange (userId, range) {
      console.log(range);
      return $http.post(`${apiUrl}/readings/dateRange/${userId}`, range)
        .then(response => response.data);
    },

    getByUser (userId) {
      return $http.get(`${apiUrl}/readings/byUser/${userId}`)
        .then(response => response.data);
    },

    getAggregate () {},

    postNew (userId, reading) {
      return $http.post(`${apiUrl}/readings/${userId}`, reading)
        .then(response => response.data);
    }
  };
}
