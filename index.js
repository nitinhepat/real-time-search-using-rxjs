const searchInut = document.getElementById('searchEle');
const searchInput$ = rxjs.fromEvent(searchInut, 'keyup');
const result = document.getElementById('result')

const {
    debounceTime,
    map,
    switchMap,
    distinctUntilChanged,
    filter,
    concatMap,
    toArray
} = rxjs.operators;
const { ajax } = rxjs.ajax;


searchInput$.
    pipe(
        map(input => input.target.value),
        filter(query => query.length > 2),
        distinctUntilChanged(),
        switchMap(query => getPosts(query)))
    .subscribe((searchResult) => {
        if (searchResult && searchResult.length) {
            result.innerHTML = searchResult.map(search => {
                return `<li>
                            <div>
                                <label>Name: </label>
                                <span>${search.name}</span>
                            </div>
                            <div>
                                <label>
                                    Url: 
                                </label>
                                    ${search.latest}
                                <span>
                                </span>
                            </div>
                            

                        </li>`
            }).join('');
        } else {
            result.innerHTML = '<strong>No data available</strong>'
        }

    })


getPosts = (searchString) => {
    return ajax.getJSON(`https://api.cdnjs.com/libraries?search=${searchString}`)
        .pipe(
            map(response => response.results.slice(0, 10))
        )
}
