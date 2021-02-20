#!/usr/bin/env node
/// <reference types="node" />
import { SendHandle, Serializable } from 'child_process';
export interface ICommandOptions {
    path?: string;
    title?: string;
    method?: string;
    filename?: string;
    file?: string;
    ext?: 'js' | 'ts';
    baseUri?: string;
    srcPath?: string;
}
export interface ICommandInfo {
    name: string;
    args: string[];
    options: ICommandOptions;
}
export interface ISpawnCallbacks {
    stdout: (stream: Buffer, data: string) => void;
    stderr: (stream: Buffer, data: string) => void;
    error: (error: Error) => void;
    close: (code: number, signal: NodeJS.Signals) => void;
    exit?: (code: number, signal: NodeJS.Signals) => void;
    message?: (message: Serializable, sendHandle: SendHandle) => void;
}
