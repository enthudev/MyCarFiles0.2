import {inject, Lazy, All} from 'aurelia-framework';
import {DataCache} from 'services/dataCache';
import {ImLazy} from 'services/ImLazy';

@inject(DataCache, Lazy.of(ImLazy), All.of("SuperPlugin"))
export class Events {
    constructor(dataCache, lazyOfImLazy, plugins) {
        this.events = [
            { id: 1, title: "Aurelia Fundamentals" },
            { id: 2, title: "Data centric SPAs with BreezeJS" }
        ];
        this.cache = dataCache;
        this.cache.data.push('a');
        this.lazyOfImLazy = lazyOfImLazy;

        plugins.forEach(function(plugin) {
            plugin.doPlugInStuff();
        });
    }

    createAndUseLazy() {
        console.log('about to use lazy');
        this.lazyOfImLazy().doStuff();
    }
}
