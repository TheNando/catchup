import { reducer, setDialog, setProjects } from './store'

describe('Action Creators', () => {
  it('creates a set dialog action', () => {
    expect(setDialog({ name: 'dialog' })).toMatchInlineSnapshot(`
                                    Object {
                                      "dialog": Object {
                                        "name": "dialog",
                                      },
                                      "type": "SET_DIALOG",
                                    }
                        `)
  })

  it('creates a set projects action', () => {
    expect(setProjects(['1', '2', '3'])).toMatchInlineSnapshot(`
                                    Object {
                                      "projects": Array [
                                        "1",
                                        "2",
                                        "3",
                                      ],
                                      "type": "SET_PROJECTS",
                                    }
                        `)
  })
})

describe('Reducer', () => {
  it('sets initial state', () => {
    expect(reducer(undefined, {})).toMatchInlineSnapshot(`
      Object {
        "dialog": null,
        "pomodoro": Object {
          "cycle": 0,
          "duration": 1500,
          "project": "Default",
          "remaining": 1500,
        },
        "projects": Array [
          "Default",
        ],
      }
    `)
  })

  it('adds dialog to state', () => {
    const action = { type: 'SET_DIALOG', dialog: { name: 'dialog' } }
    expect(reducer({}, action)).toMatchInlineSnapshot(`
                                    Object {
                                      "dialog": Object {
                                        "name": "dialog",
                                      },
                                    }
                        `)
  })

  it('adds dialog to state', () => {
    const action = { type: 'SET_PROJECTS', projects: ['1', '2', '3'] }
    expect(reducer({}, action)).toMatchInlineSnapshot(`
                  Object {
                    "projects": Array [
                      "Default",
                      "1",
                      "2",
                      "3",
                    ],
                  }
            `)
  })
})
