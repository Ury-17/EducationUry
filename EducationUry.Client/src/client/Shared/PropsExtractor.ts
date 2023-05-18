type KeyValue = {
    key: string
    value: string
}

export class PropsExtractor {
    public href: string;
    private kvs: KeyValue[];

    constructor(href: string) {
        this.href = href;
        this.kvs = [];

        const props = href.split('?')[1].split("&")

        for (let i = 0; i < props.length; i++) {
            const kv = props[i].split("=");
            this.kvs.push(({
                key: kv[0].toLowerCase(),
                value: kv[1]
            }))
            
        }
    }

    public getString(key: string): string | null {
        return this.kvs.find(c => c.key === key.toLowerCase())?.value || null
    }

    public static FromString(href: string): PropsExtractor {
        return new PropsExtractor(href)
    }

    public static FromLocation(): PropsExtractor {
        return new PropsExtractor(location.href)
    }
}