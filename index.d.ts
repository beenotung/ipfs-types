
export as namespace ipfs;

export = IPFS;

declare class IPFS {
    constructor(options: IPFS.Options);

    types: IPFS.Types;

    init(options: IPFS.InitOptions, callback: (error: Error, success?: boolean) => void): void;
    init(callback: (error: Error, success?: boolean) => void): void;

    preStart(callback: (error: Error, result?: any) => void): void;
    start(callback?: (error: Error, result?: any) => void): void;
    stop(callback?: (error?: Error) => void): void;
    isOnline(): boolean;

    version(options: any, callback: (error: Error, version: IPFS.Version) => void): void ;
    version(callback: (error: Error, version: IPFS.Version) => void): void ;
    version(): Promise<IPFS.Version>; 

    id(options: any, callback: (error: Error, version: IPFS.Id) => void): void ;
    id(callback: (error: Error, version: IPFS.Id) => void): void ;
    id(): Promise<IPFS.Id>; 

    repo: IPFS.RepoAPI;
    bootstrap: any;
    config: any;
    block: any;
    object: IPFS.ObjectAPI;
    dag: any;
    libp2p: any;
    swarm: IPFS.SwarmAPI;
    files: IPFS.FilesAPI;
    bitswap: any;

    ping(callback: (error: Error) => void): void;
    ping(): Promise<void>;

    pubsub: any; 

    on(event: string, callback: () => void): void;
}

declare namespace IPFS {
    type Callback<T> = (error: Error, result?: T) => void;

    export interface Options {
        init?: boolean;
        start?: boolean;
        EXPERIMENTAL?: any;
        repo?: string;
        config?: any;
    }

    export interface InitOptions {
        emptyRepo?: boolean;
        bits?: number;
        log?: Function;
    }

    export interface Multiaddr {
        buffer: Uint8Array;
    }

    export type Multihash = any | string;
    export type CID = any;

    export interface Types {
        Buffer: any;
        PeerId: any;
        PeerInfo: any;
        multiaddr: Multiaddr;
        multihash: Multihash;
        CID: CID;
    }

    export interface Version {
        version: string;
        repo: string;
        commit: string;
    }

    export interface Id {
        id: string;
        publicKey: string;
        addresses: Multiaddr[];
        agentVersion: string;
        protocolVersion: string;
    }

    export interface RepoAPI {
        init(bits: number, empty: boolean, callback: Callback<any>): void;

        version(options: any, callback: Callback<any>): void;
        version(callback: Callback<any>): void;

        gc(): void;
        path(): string;
    }

    export type FileContent = Object | Blob | string;

    export interface IPFSFile {
        path: string;
        hash: string;
        size: number;
        content?: FileContent;
    }


    export interface FilesAPI {
        createAddStream(options: any, callback: Callback<any>): void;
        createAddStream(callback: Callback<any>): void;

        createPullStream(options: any): any;

        add(data: FileContent, options: any, callback: Callback<IPFSFile>): void;
        add(data: FileContent, callback: Callback<IPFSFile>): void;
        add(data: FileContent): Promise<IPFSFile>;

        cat(hash: Multihash, callback: Callback<FileContent>): void;
        cat(hash: Multihash): Promise<FileContent>;

        get(hash: Multihash, callback: Callback<IPFSFile>): void;
        get(hash: Multihash): Promise<IPFSFile>;

        getPull(hash: Multihash, callback: Callback<any>): void;
    }

    export interface PeersOptions {
        v?: boolean;
        verbose?: boolean;
    }

    export type PeerId = any;

    export interface PeerInfo {
        id: PeerId;
        multiaddr: Multiaddr;
        multiaddrs: Multiaddr[];
        distinctMultiaddr(): Multiaddr[];
    }

    export interface Peer {
        addr: Multiaddr;
        peer: PeerInfo;
    }

    export interface SwarmAPI {
        peers(options: PeersOptions, callback: Callback<Peer[]>): void;
        peers(callback: Callback<Peer[]>): void;
        peers(): Promise<Peer[]>;

        addrs(callback: Callback<PeerInfo[]>) : void;
        addrs(): Promise<PeerInfo[]>;

        localAddrs(callback: Callback<Multiaddr[]>): void;
        localAddrs(): Promise<Multiaddr[]>;

        connect(maddr: Multiaddr | string, callback: Callback<any>): void;
        connect(maddr: Multiaddr | string): Promise<any>;

        disconnect(maddr: Multiaddr | string, callback: Callback<any>): void;
        disconnect(maddr: Multiaddr | string): Promise<any>;

        filters(callback: Callback<void>): never;
    }

    export type DAGNode = any;
    export type DAGLink = any;
    export type DAGLinkRef = DAGLink | any;
    export type Obj = BufferSource | Object;

    export interface ObjectStat {
        Hash: Multihash;
        NumLinks: number;
        BlockSize: number;
        LinksSize: number;
        DataSize: number;
        CumulativeSize: number;
    }

    export interface PutObjectOptions {
        enc?: any;
    }

    export interface GetObjectOptions {
        enc?: any;
    }

    export interface ObjectPatchAPI {
        addLink(multihash: Multihash, link: DAGLink, options: GetObjectOptions, callback: Callback<any>): void;
        addLink(multihash: Multihash, link: DAGLink, callback: Callback<any>): void;
        addLink(multihash: Multihash, link: DAGLink): Promise<any>;

        rmLink(multihash: Multihash, linkRef: DAGLinkRef, options: GetObjectOptions, callback: Callback<any>): void;
        rmLink(multihash: Multihash, linkRef: DAGLinkRef, callback: Callback<any>): void;
        rmLink(multihash: Multihash, linkRef: DAGLinkRef): Promise<any>;

        appendData(multihash: Multihash, data: any, options: GetObjectOptions, callback: Callback<any>): void;
        appendData(multihash: Multihash, data: any, callback: Callback<any>): void;
        appendData(multihash: Multihash, data: any): Promise<any>;

        setData(multihash: Multihash, data: any, options: GetObjectOptions, callback: Callback<any>): void;
        setData(multihash: Multihash, data: any, callback: Callback<any>): void;
        setData(multihash: Multihash, data: any): Promise<any>;
    }

    export interface ObjectAPI {
        new(template: 'unixfs-dir', callback: Callback<DAGNode>): void;
        new(callback: Callback<DAGNode>): void;
        new(): Promise<DAGNode>;

        put(obj: Obj, options: PutObjectOptions, callback: Callback<any>): void;
        put(obj: Obj, callback: Callback<any>): void;
        put(obj: Obj): Promise<any>;

        get(multihash: Multihash, options: GetObjectOptions, callback: Callback<any>): void;
        get(multihash: Multihash, callback: Callback<any>): void;
        get(multihash: Multihash): Promise<any>;

        data(multihash: Multihash, options: GetObjectOptions, callback: Callback<any>): void;
        data(multihash: Multihash, callback: Callback<any>): void;
        data(multihash: Multihash): Promise<any>;

        links(multihash: Multihash, options: GetObjectOptions, callback: Callback<DAGLink[]>): void;
        links(multihash: Multihash, callback: Callback<DAGLink[]>): void;
        links(multihash: Multihash): Promise<DAGLink[]>;

        stat(multihash: Multihash, options: GetObjectOptions, callback: Callback<ObjectStat>): void;
        stat(multihash: Multihash, callback: Callback<ObjectStat>): void;
        stat(multihash: Multihash): Promise<ObjectStat>;

        patch: ObjectPatchAPI;
    }

    export function createNode(options: Options): IPFS;
}