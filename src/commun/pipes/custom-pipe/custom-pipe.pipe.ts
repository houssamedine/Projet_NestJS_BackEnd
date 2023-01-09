import {ArgumentMetadata, Injectable, PipeTransform} from '@nestjs/common';

@Injectable()
export class CustomPipePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log({value, metadata});
    try {
      const data = value.split('-');
      console.log({data})
      return data[1];
    }catch (e) {
      console.log({e})
      return null;
    }
  }
}
