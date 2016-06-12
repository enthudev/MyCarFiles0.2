import {Events} from 'viewmodels/events';
export class shell {
    constructor() {
        this.parentprop = "Hug your parents!";
    }
    configureRouter(config, router) {
        this.router = router;
        config.title = "Capital Area .NET Users Group";
        config.map([
            {route:['', 'events'], moduleId:'viewmodels/events'}
        ])
    }
}