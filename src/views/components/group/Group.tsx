import React from 'react'
import styled from 'styled-components'
import { Country } from '../../../models/Country'
import { GroupView, GroupVM } from './GroupView'
import AppContext from '../../../infrastructure/AppContext'
import { Radio } from '../Radio'

export class Group extends React.Component<Props, any> implements GroupView {
    presenter = AppContext.presenters.group(this)

    state = {
        model: new GroupVM(),
    }

    modelChanged(model: GroupVM): void {
        this.setState({model})
    }

    componentDidMount() {
        this.presenter.start()
    }

    render() {
        return <Table>
            <Header>
                <p>Group {this.props.name}</p>
                <p>1º</p>
                <p>2º</p>
            </Header>
            {this.props.countries.map(country => {
                return (
                    <Team key={country.name}>
                        <p key={country.name}>{country.fullNameOriented()}</p>
                        <Radio
                            name={`first-${this.props.name}`}
                            onInput={() => this.props.selectFirst(country)}
                        />
                        <Radio
                            name={`second-${this.props.name}`}
                            onInput={() => this.props.selectSecond(country)}
                        />
                    </Team>
                )
            })}
        </Table>
    }
}

const Table = styled.div`
  max-width: 300px;
  min-width: 300px;
  border-radius: 10px;
  box-shadow: 5px 5px 10px -5px rgba(0, 0, 0, .7);
  margin: 25px 25px;
  
  p:first-child {
    width: 40%;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: rgb(167, 167, 167);
  border: none;
  border-radius: 10px 10px 0 0;
  color: white;
`

const Team = styled.div`
  border-top: 1px solid rgba(213, 213, 213, .2);
  margin: 1px;
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  p {
    width: 40%;
    text-align: left;
  }
`

interface Props {
    name: string
    countries: Country[]
    selectFirst: (country: Country) => void
    selectSecond: (country: Country) => void
}