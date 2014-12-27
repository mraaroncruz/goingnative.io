#= require theme

angular.module("thepickmachine", [])

angular.module("thepickmachine")
  .controller("ApplicationController", ($scope)->
    $scope.baseURL = "http://dbpm.aaroncruz.com"
  )
  .controller("PicksController", ($scope, $http) ->
    cachedPicks = []
    emptyMessage = "No picks found"
    loadingMessage = "Loading Picks..."

    regex = new RegExp("^(#{emptyMessage}|#{loadingMessage})$")
    $scope.shouldShowInfo = (pick) -> pick.name && !pick.name.match(regex)

    $scope.picks = [name: $scope.loadingMessage, link: '']

    $scope.cleanEpisodeTitle = (title) -> title.replace('Show - ', '')

    $scope.shorten = (link, len=20) ->
      shorter = ""
      return shorter unless link
      if link
        shorter = link.replace(/^https?:\/\//, '')
      if link.length > len
        shorter = shorter[0...len] + "..."
      shorter

    $scope.$watch 'search.term', (curr, prev) ->
      return if curr == prev
      if curr == ""
        $scope.picks = cachedPicks
      else
        $http.get("#{$scope.baseURL}/search", params: { q: curr }).then (res) ->
          if res.data.length > 0
            $scope.picks = res.data
          else
            $scope.picks = [name: emptyMessage]

    init = ->
      $http.get($scope.baseURL).then (res) ->
        $scope.picks = res.data
        cachedPicks = angular.copy(res.data)

    init()

  )
  .controller("ShowButtonsController", ($scope, $http) ->
    $http.get("#{$scope.baseURL}/shows").then (res) ->
      $scope.shows = res.data

    $scope.chooseShow = (show) -> console.debug "show", show

  )
  .directive("logo", ->
    scope:
      pick: "=for"
    replace: true
    template: """
      <span>{{logoSrc}}</span>
    """
    link: (scope, element, attrs) ->
      getLogo = ->
        show = scope.pick.show_name
        if show
          letters = (word[0] for word in show.split(" "))
          letters.join('')
        else
          ""

      scope.logoSrc = getLogo()
  )
