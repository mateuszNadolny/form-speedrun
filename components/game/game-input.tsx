'use client';

import { useState } from 'react';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { FormInputProps } from '@/types/types';
import PrimaryButton from '../ui/primary-button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { formatDate } from '@/lib/time';
import PasswordInput from '../ui/password-input';

const FormInput = ({ input, onComplete }: FormInputProps) => {
  const [value, setValue] = useState('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value === input.value) {
      onComplete();
      setValue('');
    }
  };

  const renderInput = () => {
    switch (input.type) {
      case 'textarea':
        return (
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border-1 p-2 text-lg lg:text-xl rounded-xl border-color-teritary bg-color-secondary text-color-light w-[90%] lg:w-full my-2"
            required
          />
        );
      case 'select':
        return (
          <Select
            onValueChange={(e) => {
              setValue(e);
            }}>
            <SelectTrigger className="w-[180px] bg-color-secondary text-color-light">
              <SelectValue placeholder={input.label} />
            </SelectTrigger>
            <SelectContent className="bg-color-secondary text-color-light">
              {input?.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'radio':
        return (
          <RadioGroup
            className="text-color-light my-2"
            onValueChange={(e) => {
              setValue(e);
            }}>
            {input?.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={option} className="text-xl text-color-light" />
                <Label htmlFor={option} className="text-xl text-color-light">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
      case 'checkbox':
        return (
          <Switch
            checked={value === 'true'}
            onCheckedChange={(e) => setValue(e ? 'true' : 'false')}
          />
        );
      case 'range':
        return (
          <div className="flex flex-row-reverse justify-end items-center gap-12 lg:gap-6 my-2">
            <Label className="text-4xl font-medium text-color-teritary">{value ? value : 0}</Label>
            <input
              className="w-[250px] lg:w-[300px]"
              defaultValue={0}
              type="range"
              min={input.min}
              max={input.max}
              value={value ? value : 0}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        );
      case 'date':
        return (
          <>
            <input
              type="date"
              id="date"
              className="p-2 rounded-xl bg-color-secondary text-color-light text-xl w-[400px] my-2"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </>
        );
      case 'time':
        return (
          <>
            <input
              type="time"
              className="p-2 rounded-xl bg-color-secondary text-color-light text-xl w-[400px] my-2"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </>
        );
      case 'color':
        return (
          <>
            <input
              type="color"
              className="p-2 rounded-xl bg-color-secondary text-color-light text-xl w-[100px] h-[100px] my-2"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </>
        );
      case 'password':
        return (
          <PasswordInput
            className="p-2 text-lg lg:text-xl rounded-xl bg-color-secondary text-color-light text-xl w-[400px] my-2"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            required
          />
        );
      default:
        return (
          <input
            type={input.type}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            className="p-2 text-lg lg:text-xl rounded-xl bg-color-secondary text-color-light text-xl w-[400px] my-2"
            required
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 flex flex-col items-center lg:items-start">
      <div className="w-full flex flex-col items-center lg:items-start space-y-6">
        <Label className="block text-4xl lg:text-5xl font-medium text-color-teritary mb-2">
          {input.label}
        </Label>
        {input.type === 'date' ? (
          <p className="text-lg text-center lg:text-start text-muted-foreground mb-4">
            To enter: <span className="font-bold">{formatDate(input.value as string)}</span>
          </p>
        ) : (
          <p className="text-lg text-center lg:text-start w-[90%] lg:w-full text-muted-foreground mb-4">
            To enter: <span className="font-bold">{input.value}</span>
          </p>
        )}
        {renderInput()}
      </div>
      <PrimaryButton
        type="submit"
        className="bg-color-teritary w-[150px] text-color-light text-[18.33px]"
        disabled={input.value !== value}>
        Submit
      </PrimaryButton>
    </form>
  );
};

export default FormInput;
