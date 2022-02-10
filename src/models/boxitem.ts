class BoxItem {
    id: number;
    name: string;
    picture: string;

    constructor(boxItemId: number, boxItemName: string, boxItemText: string) {
        this.picture = boxItemText
        this.name = boxItemName
        this.id = boxItemId
    }
}

export default BoxItem