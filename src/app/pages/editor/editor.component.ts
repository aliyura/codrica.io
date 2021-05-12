import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  title = 'codrica-app';
  content = "console.log('Hello World');";
  mode = 'text/typescript';
  theme = 'yonce';
  logs: any = [];
  showLogs: boolean = false;

  constructor() {}

  readOnly = false;
  options = {
    lineNumbers: true,
    autoCloseTags: true,
    autoCloseBrackets: true,
    styleActiveLine: true,
    lineWrapping: true,
    extraKeys: { 'Alt-F': 'findPersistent', 'Ctrl-Space': 'autocomplete' },
    highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
    mode: this.mode,
    theme: this.theme,
  };

  changeMode(): void {
    this.options = {
      ...this.options,
      mode: this.mode,
    };
  }

  changeTheme(): void {
    this.options = {
      ...this.options,
      theme: this.theme,
    };

    console.log(this.options);
  }

  handleInput(event: string): void {
    this.content = event;
  }

  closeLogs() {
    this.showLogs = false;
  }
  run() {
    var self = this;
    this.logs = [];
    console.log = function (value: any, args: any) {
      self.logs.push({
        value: value,
        args: args,
        type: 'message',
      });
    };
    console.error = function (value: any, args: any, line: any) {
      self.logs.push({
        value: value,
        args: args,
        type: 'error',
      });
    };
    console.info = function (value: any, args: any, line: any) {
      self.logs.push({
        value: value,
        args: args,
        type: 'information',
      });
    };
    console.warn = function (value: any, args: any, line: any) {
      self.logs.push({
        value: value,
        args: args,
        type: 'warning',
      });
    };
    switch (this.mode.toLowerCase()) {
      case 'text/typescript':
        eval(this.content);
        break;
      case 'python':
        // PythonShell.runString('x=1+1;print(x)', {}, function (err, output) {
        //   if (err) console.log(err);
        //   console.log(output);
        // });
        break;
      case 'btnNew':
        console.log('New');
        break;
    }

    this.showLogs = true;
  }

  ngOnInit(): void {}
}
