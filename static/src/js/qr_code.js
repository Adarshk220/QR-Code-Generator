/** @odoo-module **/
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { Component, useState, useRef, onMounted, onWillStart } from  "@odoo/owl";
import {Dropdown} from '@web/core/dropdown/dropdown';
import {DropdownItem} from '@web/core/dropdown/dropdown_item';
class SystrayIcon extends Component {
   setup() {
       super.setup(...arguments);
       this.orm = useService('orm')
       this.action = useService("action");
       this.inputRef = useRef("qr_input");
       this.imageRef = useRef("qr_image");
       this.state = useState({
            QrData: [],
         });
       onWillStart(async ()=>{
               await this._qrCodeReset();
        })
   }
    async _qrCodeGenerate(InputValue) {
        var image = this.imageRef.show;
        var InputRef = this.inputRef.el.value
        var self = this;
            await this.orm.call("qr.code", "generate_qr_code", [InputRef], {}).then(function(result){
            var qrDict = {}
            qrDict['qr'] = result.qr_image;
            self.state.QrData = qrDict;
        });
    }
    _qrCodeReset() {
        var image = this.imageRef.hide;
        this.state.QrData = [];
    }
}
   SystrayIcon.template = "qr_code_icon";
   SystrayIcon.components = {Dropdown};
   export const systrayItem = { Component: SystrayIcon,};
   registry.category("systray").add("SystrayIcon", systrayItem, { sequence: 600 });