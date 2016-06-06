import "bootstrap";
import {ViewLocator} from 'aurelia-framework';
import {Plugin1} from 'services/plugin1';
import {Plugin2} from 'services/plugin2';

export function configure(aurelia) {

    aurelia.use.transient("SuperPlugin", Plugin1);
    aurelia.use.transient("SuperPlugin", Plugin2);
    aurelia.use.standardConfiguration().developmentLogging();

    ViewLocator.prototype.convertOriginToViewUrl = (origin) => {
        var moduleId = origin.moduleId;
        var id = (moduleId.endsWith('.js') || moduleId.endsWith('.ts'))
            ? moduleId.substring(0, moduleId.length - 3)
            : moduleId;
        return id.replace("viewmodels", "views") + '.html';
    };

    aurelia.start().then(a => a.setRoot("viewmodels/shell"));
}