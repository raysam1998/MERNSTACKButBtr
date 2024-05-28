export class Note {
    //etd_id , module_id , notes which is an array
    etd_id: string;
    module_id: string;
    notes: Array<string>;
    constructor(etd_id: string, module_id: string, notes: Array<string>) {
        this.etd_id = etd_id;
        this.module_id = module_id;
        this.notes = notes;
    }

}